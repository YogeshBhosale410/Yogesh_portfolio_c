import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
  createdAt?: string;
};

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  padding: 2rem;
  color: #e6f7ff;
  font-family: 'Courier New', monospace;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  color: #00d4ff;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  background: #00d4ff;
  color: #0a0a0a;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const Card = styled.div<{ read?: boolean }>`
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.25);
  border-left: 4px solid ${p => (p.read ? '#00ff7f' : '#ffb703')};
  border-radius: 10px;
  padding: 1rem;
`;

const Meta = styled.div`
  font-size: 0.8rem;
  color: #a3f7ff;
  margin-bottom: 0.5rem;
`;

const Subject = styled.h3`
  color: #00ffbf;
  margin: 0.25rem 0 0.5rem;
`;

const Small = styled.div`
  font-size: 0.85rem;
  color: #c9f9ff;
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ContactedTag = styled.button`
  background: #00ff7f;
  color: #0a0a0a;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: default;
`;

const Admin: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const logout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to fetch');
      const items = Array.isArray(data.data) ? data.data : [];
      // Normalize _id from backend to id for the UI
      const normalized: Message[] = items.map((it: any) => ({
        id: it._id ?? it.id,
        name: it.name,
        email: it.email,
        subject: it.subject || 'Contact Message',
        message: it.message,
        read: !!it.read,
        createdAt: it.createdAt,
      }));
      setMessages(normalized);
    } catch (e) {
      console.error(e);
      setBanner({ type: 'error', text: e instanceof Error ? e.message : 'Failed to load messages' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id: string) => {
    try {
      setBusyId(id);
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/admin/messages/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({} as any));
        throw new Error(j?.message || 'Failed to mark contacted');
      }
      // Optimistically update UI
      setMessages(prev => prev.map(m => (m.id === id ? { ...m, read: true } : m)));
      setBanner({ type: 'success', text: 'Marked as contacted' });
    } catch (e) {
      console.error(e);
      setBanner({ type: 'error', text: e instanceof Error ? e.message : 'Action failed' });
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: string) => {
    try {
      setBusyId(id);
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({} as any));
        throw new Error(j?.message || 'Failed to delete');
      }
      setMessages(prev => prev.filter(m => m.id !== id));
      setBanner({ type: 'success', text: 'Message deleted' });
    } catch (e) {
      console.error(e);
      setBanner({ type: 'error', text: e instanceof Error ? e.message : 'Action failed' });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Page>
      <Header>
        <Title>🔧 Admin Dashboard</Title>
        <Actions>
          <Button onClick={fetchMessages}>Refresh</Button>
          <Button onClick={logout}>Logout</Button>
        </Actions>
      </Header>

      {banner && (
        <div style={{
          background: banner.type === 'success' ? 'rgba(0,255,127,0.15)' : 'rgba(255,107,107,0.15)',
          border: `1px solid ${banner.type === 'success' ? 'rgba(0,255,127,0.35)' : 'rgba(255,107,107,0.35)'}`,
          color: banner.type === 'success' ? '#00ff7f' : '#ff6b6b',
          padding: '0.5rem 0.75rem',
          borderRadius: 8,
          marginBottom: '1rem',
          maxWidth: 900
        }}>{banner.text}</div>
      )}

      {loading ? (
        <div>Loading messages...</div>
      ) : (
        <Grid>
          {messages.map(m => (
            <Card key={m.id} read={m.read}>
              <Meta>{new Date(m.createdAt || Date.now()).toLocaleString()}</Meta>
              <Subject>{m.subject || 'Contact Message'}</Subject>
              <Small>From: {m.name} • {m.email}</Small>
              <Small style={{ marginTop: '0.5rem', color: '#fff' }}>{m.message}</Small>
              <Row>
                {m.read ? (
                  <ContactedTag disabled>Contacted</ContactedTag>
                ) : (
                  <Button onClick={() => markRead(m.id)} disabled={busyId === m.id}>
                    {busyId === m.id ? 'Working…' : 'Mark Contacted'}
                  </Button>
                )}
                <Button onClick={() => remove(m.id)} disabled={busyId === m.id} style={{ background: '#ff6b6b', color: '#fff' }}>
                  {busyId === m.id ? 'Working…' : 'Delete'}
                </Button>
              </Row>
            </Card>
          ))}
        </Grid>
      )}
    </Page>
  );
};

export default Admin;