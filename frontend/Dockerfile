FROM ubuntu:latest

RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

RUN apt-get update && apt-get install -y sudo \
    && echo "frontend ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

RUN useradd -ms /bin/bash -G sudo frontend
USER frontend
WORKDIR /home/frontend

RUN sudo apt-get update && sudo apt-get install -y curl

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
ENV NVM_DIR=/home/frontend/.nvm
RUN . $NVM_DIR/nvm.sh && nvm install v13.9.0 

RUN sudo apt-get update && sudo apt-get install -y firefox

EXPOSE 3000

WORKDIR workspace

CMD [ "bash" ]


