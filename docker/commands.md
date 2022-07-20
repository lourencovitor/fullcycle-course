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
