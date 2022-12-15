// https://www.loom.com/share/bd9ce8fad2b9405c91e5b7ed2f090e67
// link para o vídeo de demonstração.

let bgs = [];
let player, fox;
let monkey, helper;
let floor;
let question;
let number1, number2, answer;
let answer1, answer2;
let fruit1, fruit2;
let example1, example2;
let example1Text, example2Text;
let tela = 0;
let returnHome;
let rendered = false;
let myCreditsImage;
let wins = 0;
let winsSprite;
let gameOverSound, winSound;

function preload() {
  bgs.push(loadImage('assets/bg001.png'));
  bgs.push(loadImage('assets/bg002.png'));
  myCreditsImage = loadImage('assets/profile.jpg');
  gameOverSound = loadSound('assets/sounds/gameover.mp3');
  winSound = loadSound('assets/sounds/win.mp3');
}

function setup() {
  new Canvas(550, 400);
}

function draw() {
  if (tela === 0) {
    background(255);
    
    fill(50);
    textSize(40);
    text('Catchy the Fruit', 130, 60);
    
    fill(0, 255, 0);
    rect(170, 100, 200, 75);
    fill(255);
    textSize(25);
    text('JOGAR', 220, 150);
    
    fill(255, 0, 255);
    rect(170, 200, 200, 75);
    fill(255);
    textSize(25);
    text('INSTRUÇÕES', 185, 250);
    
    fill(255, 0, 0);
    rect(170, 300, 200, 75);
    fill(255);
    textSize(25);
    text('CRÉDITOS', 205, 350);
  }

  if (tela === 1) {
    world.gravity.y = 10;
    
    if (wins === 0)
      background(bgs[0]);
    else
      background(bgs[1]);
    
    if (!rendered) {
      menuText = new Sprite();
      menuText.text = "Menu";
      menuText.collider = 'static';
      menuText.w = 70;
      menuText.h = 30;
      menuText.y = 20;
      menuText.x = 40;
      
      number1 = parseInt(random(0, 50));
      number2 = parseInt(random(0, 50));
      answer = number1 + number2;

      floor = new Sprite();
      floor.w = 550;
      floor.y = 385;
      floor.collider = 'static';
      floor.visible = false;

      question = new Sprite();
      question.w = 350;
      question.y = 50;
      question.collider = 'static';
      question.text = `Quanto é ${number1} + ${number2}?`;
      question.textSize = 20;

      answer1 = new Sprite();
      answer1.h = 20;
      answer1.x = 200;
      answer1.y = 180;
      answer1.bounciness = 1;

      answer2 = new Sprite();
      answer2.h = 20;
      answer2.x = 380;
      answer2.y = 180;
      answer2.bounciness = 1;
      
      example1 = new Sprite();
      example1.x = 200;
      example1.y = 90;
      example1.collider = 'static';
      
      example2 = new Sprite();
      example2.x = 380;
      example2.y = 90;
      example2.collider = 'static';

      fox = loadImage('assets/fox1.png');
      monkey = loadImage('assets/monkey.png')
      fruit1 = loadImage('assets/fruit1.png');
      fruit2 = loadImage('assets/fruit2.png');
      
      helper = new Sprite(46, 26, 10, 10);
      helper.x = 500;
      helper.y = 100;
      helper.collider = 'static';
      
      winsSprite = new Sprite();
      winsSprite.w = 100;
      winsSprite.y = 50;
      winsSprite.x = 500;
      winsSprite.y = 50;
      winsSprite.collider = 'static';
      winsSprite.text = `Wins: ${wins}`;
      winsSprite.textSize = 20;
      winsSprite.color = color(0, 255, 0);
      winsSprite.textColor = color(255, 255, 255);
      
      player = new Sprite(46, 26, 10, 10);
      player.y = 353;
      
      helper.draw = () => {
        scale(-1, 1);
        image(monkey, helper.vel.x * 2, helper.vel.y * 2);
      };

      player.draw = () => {
        image(fox, player.vel.x * 2, player.vel.y * 2);
      };

      answer1.draw = () => {
        image(fruit1, 0, 0, 25, 24);
      };

      answer2.draw = () => {
        image(fruit2, 0, 0, 25, 24);
      };
      
      example1.draw = () => {
        fill(0, 0, 0);
        text(answer, 20, 10);
        image(fruit1, 0, 0, 25, 24);
      };
      
      example2.draw = () => {
        fill(0, 0, 0);
        text(answer - 12, 20, 10);
        image(fruit2, 0, 0, 25, 24);
      };
      
      textSize(24);
      
      rendered = true;
    }

    getMovements();

    if (player.collides(answer1)) {
      answer1.remove();
      answer2.remove();
      player.remove();
      helper.remove();
      example1.remove();
      example2.remove();
      question.remove();
      menuText.remove();
      winsSprite.remove();
      
      if (wins < 1) {
        winSound.play();
        wins += 1;
        rendered = false;
      } else {
        winSound.stop();
        winSound.play();
        tela = 5;
        wins = 0;
      }
    }

    if (player.collides(answer2)) {
      answer1.remove();
      answer2.remove();
      player.remove();
      helper.remove();
      example1.remove();
      example2.remove();
      question.remove();
      menuText.remove();
      winsSprite.remove();
      
      tela = 4;
      wins = 0;
      gameOverSound.play();
    }
  }
  
  if (tela === 2) {
    background(255);
    fill(40);
    text('INSTRUÇÕES', 200, 40);
    
    text('Mova para a esquerda com a tecla "A"', 50, 150);
    text('Mova para a direita com a tecla "D"', 50, 200);
    text('Pule com a tecla "Espaço"', 50, 250);
    
    text('Voltar', 10, 40);
  }
  
  if (tela === 3) {
    background(255);
    textSize(30);
    fill(40);
    text('CRÉDITOS', 200, 40);
    text('Voltar', 10, 40);
    
    textSize(20);
    text('patvanmackelberg, bleutailfly, & Jordan Irwin\n (sprites do player)', 50, 150);
    text('shiru8bit (sprites das frutas)', 50, 200);
    text('OpenGameArt (todos os sprites, inclusive background)', 50, 230);
    text('Professor Rummenigge', 50, 260);
    
    image(myCreditsImage, 50, 290, 100, 100);
    text('João Victor Soares', 160, 310);
    text('Criador e Desenvolvedor', 160, 340);
  }
  
  if (tela === 4) {
    background(255);
    text('Voltar', 10, 40);
    
    text('GAME OVER', 200, 200);
    textSize(30);
    fill(90);
  }
  
  if (tela === 5) {
    background(255);
    text('Voltar', 10, 40);
    
    text('VOCÊ GANHOU!', 160, 200);
    textSize(30);
    fill(90);
  }
}

function getMovements() {
  if (kb.presses('a') || kb.pressing('a')) {
    player.x -= 2;
  }

  if (kb.presses('d') || kb.pressing('d')) {
    player.x += 2;
  }
  
  if (kb.presses(' ') && !kb.holding(' ')) {
    player.move(400, 'up', 3);
  }
}

function mouseClicked() {
  if (tela === 0) {
    if (mouseX < 371 && mouseX > 167) {
      if (mouseY < 177 && mouseY > 96) {
        tela = 1;
        rendered = false;
      }
      
      if (mouseY < 274 && mouseY > 197) {
        clear();
        tela = 2;
        rendered = false;
      }
      
      if (mouseY < 375 && mouseY > 297) {
        clear();
        tela = 3;
        rendered = false;
      }
    }
  }
  
  if (tela === 2) {
    if (mouseX < 73 && mouseX > 9) {
      if (mouseY < 40 && mouseY > 21) {
        tela = 0;
        rendered = false;
      }
    }
  }
  
  if (tela === 3) {
    if (mouseX < 86 && mouseX > 12) {
      if (mouseY < 40 && mouseY > 17) {
        tela = 0;
        rendered = false;
      }
    }
  }
  
  if (tela === 1) {
    if (mouseX < 76 && mouseX > 4) {
      if (mouseY < 36 && mouseY > 4) {
        rendered = false;
        answer1.remove();
        answer2.remove();
        player.remove();
        helper.remove();
        example1.remove();
        example2.remove();
        question.remove();
        menuText.remove();
        winsSprite.remove();
        tela = 0;
        wins = 0;
      }
    }
  }
  
  if (tela === 4 || tela === 5) {
    if (mouseX < 87 && mouseX > 8) {
      if (mouseY < 40 && mouseY > 15) {
        tela = 0;
        wins = 0;
        rendered = false;
        gameOverSound.stop();
      }
    }
  }
}