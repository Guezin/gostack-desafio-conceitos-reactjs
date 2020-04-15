import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  let count = 0;
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const { data } = await api.post('/repositories', {
      title: 'Desafio ReactJS',
      url: 'https://github.com/Guezin',
      techs: ['React', 'Node.js']
    });

    return setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    const copyRepositories = [...repositories]
    const repository = copyRepositories.findIndex(repo => repo.id === id);
    
    copyRepositories.splice(repository, 1)
    
    await api.delete(`/repositories/${id}`);
    
    return setRepositories(copyRepositories)
  }

  useEffect(() => {
    async function handleListRepository() {
      const { data } = await api.get('/repositories');
        setRepositories(data)
    }

    handleListRepository();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>{repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
