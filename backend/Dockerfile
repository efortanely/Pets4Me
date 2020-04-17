FROM ubuntu:latest

RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

RUN apt-get update && apt-get install -y sudo \
    && echo "backend ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

RUN useradd -ms /bin/bash -G sudo backend
USER backend
WORKDIR /home/backend

RUN sudo apt-get update \
    && sudo apt-get install -y postgresql postgresql-contrib libpq-dev \
    && sudo sed -ri "s/peer|md5/trust/g" /etc/postgresql/10/main/pg_hba.conf

RUN sudo apt-get update && sudo apt-get install -y python3 python3-venv python3-pip

ENV TZ Etc/UTC
ENV SQLALCHEMY_DATABASE_URI postgresql://postgres@localhost/postgres

EXPOSE 5000

WORKDIR workspace

CMD [ "bash" ]


