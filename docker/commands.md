`docker ps` - Te mostra os containers rodando na sua maquina

`docker run hello-world` - Commando que roda o container o 'hello-world' é uma imagem

`docker ps -a` - Mostra todos os containers ativos e todos os containers que executaram e morreram

`docker run -it ubuntu bash` - -i de interativo prende o terminal e o -t tty para digitar coisas no terminal

`docker start 'idContainer'` - starta o container

`docker stop 'idContainer'` - para o container

`docker run -it --rm ubuntu:latest bash` - Sobe o container entra dentro dele pelo bash e após derrubalo ele limpa do historico (remove automaticamente)

`docker run -p 8080:80 nginx` - O comando -p ele publica a porta que queremos trabalhar

`docker run -d -p 8080:80 nginx` - O comando -d detached desatachado o terminal do container.

`docker rm idContainer` - docker rm remove o container que foi passado o id pode ser passado por id ou pelo nome

`docker rm idContainer -f` o -f força para remover ou para fazer outra coisa

`docker run -d --name nginx nginx` - o comando --name você pode passar um nome para o container

`docker exec nginx ls` - Comando serve para entrar dentro do container

`docker exec nginx bash` - executa o bash do container nginx executa e sai

`docker exec -it nginx bash` - executa o bash e trava no bash do container para que você possa digitar dentro do container

`docker run -d -v "$(pwd)"/html/x:/usr/share/nginx/html nginx` - diferença entre -v para --mount o -v cria o arquivo ou diretorio caso não exista

`docker run -d -name nginx -p 8080:80 -v ~/Documents/vitor/html/:/usr/share/nginx/html nginx | docker run -d --name nginx -p 8080:80 --mount type=bind,source="$(pwd)"/html,target=/usr/share/nginx/html nginx` - Criando volume (comando -v é antigo | utilizando jeito novo)

`docker volume` - mostra um helper do volume

`docker volume ls` - mosta a lista de volumes

`docker volume create meuvolume` - criando um volume

`docker volume inspect meuvolume` - Informações sobre o volume

`docker run --name nginx -d --mount type=volume,source=meuvolume,target=/app nginx` - compartilhando volumes caso utilize o mesmo volume para dois containers algo que cria apaga ou edita sera afetado no volume

`docker volume prune` - mata tudo que não ta sendo utilizado dentro da sua maquina

`docker pull ubuntu` - baixar imagem para o seu computador

`docker images` - lista todas as imagens

`docker rmi php:latest` - remover uma imagem

`docker build -t vitorlourenco/nginx-com-vim:latest .` - gerando uma imagem com Dockerfile

`docker ps -a -q` - pega todos os ids

`docker rm $(docker ps -a -q) -f` - Matar todos os containers que estão ativos e inativos

`docker run --rm vitorlourenco/nginx-com-vim echo "oi"` - substitui o que mostraria no CMD para o que passamos ao echo

`docker run --rm -it -v $(pwd)/:usr/src/app -p 3000:3000 node:15 bash` - rodando node pelo container mais acessando aplicação da maquina

`docker build -t lourencovitor/hello-express . -f Dockerfile.prod` - gerando imagem com Dockerfile.prod

`docker-compose up ` - subindo aplicação do arquivo compose

`docker-compose down` - desce o container

`docker-compose ps` - lista container rodando em compose

`docker-compose up -d --build` - sobe o container e refaz o build antes
