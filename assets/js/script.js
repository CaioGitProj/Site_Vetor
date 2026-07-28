document.addEventListener('DOMContentLoaded', () => {
  const topicLinks = document.querySelectorAll('.topics-menu__link');
  const contentTopics = document.querySelectorAll('.content-topic');
  const iconSets = document.querySelectorAll('.icon-set');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNavContainer = document.querySelector('.mobile-nav-container');
  const mainPanel = document.querySelector('.panel--main');

  // 1. Lógica do Menu Mobile (Menu Hambúrguer)
  if (hamburgerMenu && mobileNavContainer) {
    hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('is-open');
      mobileNavContainer.classList.toggle('is-open');
    });
  }

  // 2. Função para alternar o conteúdo (Abas / Seções)
  const showContent = (targetId) => {
    // Ativa a seção de texto correspondente
    contentTopics.forEach(topic => {
      topic.classList.toggle('is-active', `#${topic.id}` === targetId);
    });

    // Resolve a diferença de nomeação no HTML 
    // Ex: href="#oque-vemos" -> id="shapes-oquevemos"
    const cleanId = targetId.substring(1).replace('-', '');
    const shapeTargetId = `#shapes-${cleanId}`;
    
    // Ativa a animação de ícones de fundo correta na coluna esquerda
    iconSets.forEach(container => {
      container.classList.toggle('is-active', `#${container.id}` === shapeTargetId);
    });

    // Destaca o link clicado no menu lateral direito
    topicLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === targetId);
    });
  };

  // 3. Evento de clique no Menu Lateral (Assuntos)
  topicLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const isMobile = window.innerWidth <= 768;

      // Se a aba já estiver ativa, não faz nada
      if (document.querySelector(targetId)?.classList.contains('is-active')) return;
      
      // Executa a troca de conteúdo e altera a URL (para permitir compartilhamento do link)
      showContent(targetId);
      window.history.pushState(null, '', targetId);

      // Comportamento para telas menores (Celular)
      if (isMobile) {
        // Fecha o menu mobile se estiver aberto
        if (mobileNavContainer && mobileNavContainer.classList.contains('is-open')) {
          hamburgerMenu.classList.remove('is-open');
          mobileNavContainer.classList.remove('is-open');
        }
        // Rola a tela suavemente até o texto
        if (mainPanel) {
          mainPanel.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 4. Suporte para o botão de "Voltar/Avançar" do navegador
  window.addEventListener('popstate', () => {
    const hash = window.location.hash || '#consultoria';
    showContent(hash);
  });

  // 5. Inicialização (Qual aba abrir quando a página carrega pela primeira vez)
  const initialTarget = window.location.hash || '#consultoria';
  showContent(initialTarget);
});



// Diferenciais
const painelDiferenciais = document.getElementById('painel-diferenciais');
  
  if (painelDiferenciais) {
    // Cria um "olheiro" que avisa quando o elemento entra na tela
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Se pelo menos 20% do painel aparecer na tela...
        if (entry.isIntersecting) {
          // Adiciona a classe que ativa as animações no CSS
          entry.target.classList.add('is-visible');
          // (Opcional) Para de observar depois que animou a primeira vez
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.2 }); // 0.2 significa 20% visível

    observer.observe(painelDiferenciais);
  }