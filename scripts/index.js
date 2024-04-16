const { createApp } = Vue;

createApp( {
    data() {
        return {
            heroi: {vida:100},
            vilao: {vida:100},
            spriteHeroi: 'anim/Colour2/__idle.gif',
            spriteVilao: 'anim/Colour1/__idle.gif',
            spriteRedefinindo: false,
            bloquearBotoes: false,
            criticoHeroi: false,
            criticoVilao: false,
            logBatalhaHeroi: '',
            logBatalhaVilao: ''
        }
    },
    methods: {
        atacar(isHeroi) {
            if(isHeroi && !this.spriteRedefinindo && !this.bloquearBotoes) {
                this.bloquearBotoes = true;
                this.spriteHeroi = 'anim/Colour2/__AttackCombo2hit.gif';
                this.resetSprite();
                this.spriteVilao = 'anim/Colour1/__Hit.gif';
                setTimeout(() => {
                    if(this.criticoHeroi) {
                        this.vilao.vida -= 10;
                        this.logBatalhaHeroi = 'Você causou 10 de dano'
                        if(this.morto()){
                            this.acaoVilao(true);
                        }
                        this.criticoHeroi=false
                    } else {
                        let dano = Math.floor(Math.random() * 9) + 2;
                        this.vilao.vida -= dano
                        this.logBatalhaHeroi = 'Você causou ' + dano.toString() + ' de dano'
                        if(this.morto()){
                            this.acaoVilao(true);
                        }
                    }
                }, 1100);
                
            }
        },
        rolar(isHeroi) {
            if(isHeroi && !this.spriteRedefinindo && !this.bloquearBotoes) {
                this.bloquearBotoes = true;
                this.spriteHeroi = 'anim/Colour2/__Roll.gif';
                this.criticoHeroi = true
                this.logBatalhaHeroi = 'Você esta com vantagem no combate, seu proximo ataque causará 10 de dano'
                this.resetSprite();
                setTimeout(() => {
                    this.acaoVilao(true);
                }, 1100);
                if(this.acaoVilao.criticoHeroi){
                    this.bloquearRolar = true
                }
            }
        },
        curar(isHeroi) {
            if(isHeroi && !this.spriteRedefinindo && !this.bloquearBotoes) {
                this.bloquearBotoes = true;
                this.spriteHeroi = 'anim/Colour2/__Crouch.gif';
                this.resetSprite();
                setTimeout(() => {
                    let cura = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
                    this.heroi.vida += cura
                    this.logBatalhaHeroi = 'Você curou ' + cura.toString() + ' de dano'
                    if(this.heroi.vida > 100) {
                    this.heroi.vida = 100;
                    }
                    this.acaoVilao(true);
                }, 1100);
            }
        },
        investida(isHeroi) {
            if(isHeroi && !this.spriteRedefinindo && !this.bloquearBotoes) {
                this.bloquearBotoes = true;
                this.spriteHeroi = 'anim/Colour2/__Dash.gif';
                this.resetSprite();
                this.spriteVilao = 'anim/Colour1/__Hit.gif';
                setTimeout(() => {
                    let danoVilao = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
                    let danoHeroi = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
                    this.vilao.vida -= danoVilao 
                    this.heroi.vida -= danoHeroi 
                    this.logBatalhaHeroi = 'Sua investida causou ' + danoVilao.toString() + ' de dano, porém em um contragolpe rapido, você sofreu ' + danoHeroi.toString() + ' de dano'
                    if(this.morto()){
                        this.acaoVilao(true);
                    }
                        
                }, 1100);
            }
        },
        acaoVilao(flag) {
            if(flag) {
                const acoes = ['atacar', 'curar', 'rolar', 'investida'];
                const i = Math.floor(Math.random() * acoes.length);
                const acaoSelecionada = acoes[i];
            
                switch(acaoSelecionada) {
                    case 'atacar':
                        this.bloquearBotoes = true;
                        this.spriteVilao = 'anim/Colour1/__AttackCombo2hit.gif'
                        this.resetSprite();
                        this.spriteHeroi = 'anim/Colour2/__Hit.gif';
                        setTimeout(() => {
                            if(this.criticoVilao) {
                                this.heroi.vida -= 10;
                                this.logBatalhaVilao = 'Seu inimigo lhe causou 10 de dano'
                                this.criticoVilao=false
                                this.morto();
                            } else {
                                let dano = Math.floor(Math.random() * 9) + 2;
                                this.heroi.vida -= dano
                                this.logBatalhaVilao = 'Seu inimigo lhe causou ' + dano.toString() + ' de dano'
                                this.morto();
                            }
                        }, 1100);
                        break;
                    case 'curar':
                        this.bloquearBotoes = true;
                        this.spriteVilao = 'anim/Colour1/__Crouch.gif'
                        this.resetSprite();
                        setTimeout(() => {
                            let cura = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
                            this.vilao.vida += cura
                            this.logBatalhaVilao = 'Seu inimigo curou ' + cura.toString() + ' de dano'
                            if(this.vilao.vida > 100) {
                            this.vilao.vida = 100;
                            }
                        }, 1100);
                        break;
                    case 'rolar':
                        this.bloquearBotoes = true;
                        this.spriteVilao = 'anim/Colour1/__Roll.gif';
                        this.logBatalhaVilao = 'Seu inimigo esta com vantagem no combate, seu proximo ataque causará 10 de dano'
                        this.resetSprite();
                        setTimeout(() => {
                        }, 1100);
                    case 'investida':
                        this.bloquearBotoes = true;
                        this.spriteVilao = 'anim/Colour1/__Dash.gif';
                        this.resetSprite();
                        this.spriteHeroi = 'anim/Colour2/__Hit.gif';
                        setTimeout(() => {
                            let danoHeroi = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
                            let danoVilao = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
                            this.heroi.vida -= danoHeroi 
                            this.vilao.vida -= danoVilao
                            this.logBatalhaVilao = 'A investida lhe causou ' + danoHeroi.toString() + ' de dano, porém em um contragolpe rapido, você golpeou seu inimigo para causar ' + danoVilao.toString() + ' de dano'
                            this.morto();
                        }, 1100);
                        break;    
                    default:
                        break;
                }
            } else {
                this.logBatalhaVilao = 'O seu inimigo esta morto!'
            }
           
        },
        resetSprite() {
            this.spriteRedefinindo = true;
            setTimeout(() => {
                this.spriteHeroi = 'anim/Colour2/__idle.gif';
                this.spriteVilao = 'anim/Colour1/__idle.gif';;
                this.spriteRedefinindo = false;
                this.bloquearBotoes = false;
            }, 1100);
        },
        morto() {
            if(this.heroi.vida <= 0) {
                this.heroi.vida = 0
                this.bloquearBotoes = true;
                this.spriteHeroi = 'anim/Colour2/__Death.gif'
                this.logBatalhaHeroi = 'Você esta morto!'
                return false
            } else if(this.vilao.vida <=0){
                this.vilao.vida = 0
                this.acaoVilao(false)
                this.bloquearBotoes = true; 
                this.spriteVilao = 'anim/Colour1/__Death.gif'
                return false
            } else {
                return true
            }
        }
    }
}).mount("#app")