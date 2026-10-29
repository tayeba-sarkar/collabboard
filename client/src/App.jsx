import { useState, useEffect } from 'react'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('collabboard-beauty');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'BS23 Interview Prep - MERN Revision', status: 'todo', color: '#ff6b6b' },
      { id: '2', title: 'CollabBoard - Team Task Board Project', status: 'inprogress', color: '#4ecdc4' },
      { id: '3', title: 'Todo App Live - todo-app-p5uy.vercel.app', status: 'done', color: '#45b7d1' },
    ];
  });
  const [title, setTitle] = useState("");
  
  useEffect(() => {
    localStorage.setItem('collabboard-beauty', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if(!title.trim()) return;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    setTasks([...tasks, { 
      id: Date.now().toString(), 
      title, 
      status: 'todo',
      color: colors[Math.floor(Math.random()*colors.length)]
    }]);
    setTitle("");
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const columns = [
    { id: 'todo', name: 'To Do', icon: '📝', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'inprogress', name: 'In Progress', icon: '🚀', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 'done', name: 'Done', icon: '✅', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          background: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '20px', 
          padding: '25px', 
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          marginBottom: '25px'
        }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '800', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>✨ CollabBoard - Shimuli ✨</h1>
          <p style={{ color: '#764ba2', fontWeight: '700', fontSize: '18px', margin: '8px 0' }}>BS23 Internship - Team Task Board</p>
          <p style={{ fontSize: '13px', color: '#666', background: '#f8f9ff', display: 'inline-block', padding: '6px 12px', borderRadius: '20px' }}>
            🎓 University of South Asia | CGPA 3.59 | Nov 2026 Available | 🔗 todo-app-p5uy.vercel.app
          </p>
        </div>

        {/* Input */}
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '20px', 
          display: 'flex', 
          gap: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginBottom: '25px',
          justifyContent: 'center'
        }}>
          <input 
            value={title} 
            onChange={e=>setTitle(e.target.value)}
            onKeyPress={e=>e.key==='Enter' && addTask()}
            placeholder="✨ Add a beautiful new task..." 
            style={{ 
              border: '2px solid #e0e7ff', 
              padding: '14px 18px', 
              borderRadius: '12px', 
              width: '400px',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.3s'
            }} 
          />
          <button 
            onClick={addTask} 
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              padding: '14px 28px', 
              borderRadius: '12px', 
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              fontSize: '16px'
            }}
          >+ Add Magic</button>
        </div>

        {/* Boards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          {columns.map(col => (
            <div key={col.id} style={{ 
              background: 'rgba(255,255,255,0.95)', 
              borderRadius: '20px', 
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              minHeight: '400px'
            }}>
              <div style={{ 
                background: col.gradient,
                borderRadius: '14px',
                padding: '14px',
                color: 'white',
                textAlign: 'center',
                marginBottom: '18px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                <h2 style={{ margin: 0, fontSize: '18px' }}>{col.icon} {col.name}</h2>
                <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '20px', padding: '4px 10px', display: 'inline-block', marginTop: '6px', fontSize: '13px', fontWeight: 'bold' }}>
                  {tasks.filter(t=>t.status===col.id).length} tasks
                </div>
              </div>

              {tasks.filter(t=>t.status===col.id).map(task => (
                <div key={task.id} style={{ 
                  background: 'white', 
                  padding: '16px', 
                  borderRadius: '14px', 
                  marginBottom: '12px',
                  borderLeft: `5px solid ${task.color}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}>
                  <p style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#2d3748', lineHeight: '1.4' }}>{task.title}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {col.id !== 'todo' && (
                        <button onClick={()=>moveTask(task.id, col.id==='done'?'inprogress':'todo')} 
                          style={{ background: '#edf2f7', border: 'none', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer' }}>←</button>
                      )}
                      {col.id !== 'done' && (
                        <button onClick={()=>moveTask(task.id, col.id==='todo'?'inprogress':'done')} 
                          style={{ background: col.gradient, color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>→</button>
                      )}
                    </div>
                    <button onClick={()=>deleteTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default App