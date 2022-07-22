`network` - comum utilizada para fazer um container se comunicar com o outro

`bridge` - rede bridge é a default

`host` - mescla o host do docker com o host pai

`overlay` - rede overlay conecta varios dockers de redes separadas

`maclan` - rede por mac address

`none` - nenhuma rede utilizada

`docker network` - list commands de network

`docker network ls` - lista as redes

`docker network prune` - mata as networks não utilizadas

`docker network inspect bridge` - especiona o network

`docker attach ubuntu1` - cair direto no terminal

`docker network connect minharede ubuntu3` - Conectando ubuntu3 a rede 'minharede'

`docker run --rm -d --name nginx --network host nginx` - Trabalhando com host ele junta a rede do docker a sua
