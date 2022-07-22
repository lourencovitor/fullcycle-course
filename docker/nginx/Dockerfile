# Docker file é a receita de bolo

# Criar uma imagem


# Example image default
# FROM nginx:latest

# WORKDIR /app
# RUN apt-get update && \
#     apt-get install vim -y 

# COPY html /usr/share/nginx/html

# -------------------

# # Example ENTRYPOINT vs CMD

# FROM ubuntu:latest

# # command sempre fixo
# ENTRYPOINT ["echo", "Hello"]

# # commando variado entra como parametro do entrypoint
# CMD ["World"]


FROM nginx:latest

COPY html /usr/share/nginx/html

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]