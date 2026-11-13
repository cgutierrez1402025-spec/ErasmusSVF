document.getElementById('year').textContent = new Date().getFullYear();

fetch('data/projects.json')
  .then(r => r.json())
  .then(data => {
    const list = document.getElementById('project-list');
    data.projects.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card';
      const h = document.createElement('h3');
      h.textContent = p.title;
      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = `${p.period} · ${p.type}`;
      const d = document.createElement('p');
      d.textContent = p.description;
      card.append(h, meta, d);
      list.appendChild(card);
    });
    const dest = document.getElementById('destinations');
    data.destinations.forEach(x => {
      const li = document.createElement('li');
      li.textContent = x;
      dest.appendChild(li);
    });
  })
  .catch(() => {
    document.getElementById('project-list').textContent = 'No se pudieron cargar los proyectos.';
  });
