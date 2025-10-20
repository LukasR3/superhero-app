// URL da API
const API_URL = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json';

// Elementos do DOM
const heroesContainer = document.getElementById('heroes-container');
const loadingElement = document.getElementById('loading');

// Função para buscar os super-heróis da API
async function fetchHeroes() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        
        const heroes = await response.json();
        displayHeroes(heroes);
        
    } catch (error) {
        console.error('Erro:', error);
        showError();
    }
}

// Função para exibir os super-heróis na tela
function displayHeroes(heroes) {
    // Esconde o loading
    loadingElement.style.display = 'none';
    
    // Limpa o container
    heroesContainer.innerHTML = '';
    
    // Cria um card para cada herói
    heroes.forEach(hero => {
        const heroCard = createHeroCard(hero);
        heroesContainer.appendChild(heroCard);
    });
}

// Função para criar o card de cada herói
function createHeroCard(hero) {
    // Cria a div principal do card
    const card = document.createElement('div');
    card.className = 'hero-card';
    
    // Cria a div da imagem
    const imageContainer = document.createElement('div');
    imageContainer.className = 'hero-image-container';
    
    const image = document.createElement('img');
    image.src = hero.images.sm;
    image.alt = hero.name;
    image.className = 'hero-image';
    
    // Tratamento de erro para imagens que falharem ao carregar
    image.onerror = function() {
        this.src = 'https://via.placeholder.com/300x400?text=Imagem+Indisponível';
    };
    
    imageContainer.appendChild(image);
    
    // Cria a div do nome
    const nameContainer = document.createElement('div');
    nameContainer.className = 'hero-name';
    
    const name = document.createElement('h3');
    name.textContent = hero.name;
    
    nameContainer.appendChild(name);
    
    // Adiciona os elementos ao card
    card.appendChild(imageContainer);
    card.appendChild(nameContainer);
    
    return card;
}

// Função para exibir erro
function showError() {
    loadingElement.style.display = 'none';
    heroesContainer.innerHTML = '<div class="error">Erro ao carregar os super-heróis. Tente novamente mais tarde.</div>';
}

// Carrega os heróis quando a página carregar
window.addEventListener('DOMContentLoaded', fetchHeroes);
