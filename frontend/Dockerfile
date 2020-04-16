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

RUN sudo curl -O https://nodejs.org/download/release/v13.9.0/node-v13.9.0-linux-x64.tar.gz \
    && tar xzf node-v13.9.0-linux-x64.tar.gz \
    && sudo mv node-v13.9.0-linux-x64 /opt/node-v13.9.0-linux-x64

ENV PATH="/opt/node-v13.9.0-linux-x64/bin:${PATH}"

RUN sudo apt-get update && sudo apt-get install -y firefox

EXPOSE 3000

WORKDIR workspace

CMD [ "bash" ]


