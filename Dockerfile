ARG PYTHON_VERSION=3.11
ARG PYTHON_IMAGE_PATH=python:${PYTHON_VERSION}-slim-buster
FROM $PYTHON_IMAGE_PATH AS base

# Fixes locale encoding of filenames nfs
ENV LANG C.UTF-8

RUN apt-get update && \
    apt-get install -yqq --no-install-recommends \
#      python-dev \
#      git \
      build-essential gcc \
      libpq-dev && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN python -m venv /python-venv
ENV PATH="/python-venv/bin:$PATH"

RUN pip install --upgrade pip

COPY ./requirements.txt /requirements.txt

RUN pip install --no-cache-dir -r /requirements.txt


FROM base AS fastapi

COPY --from=base /python-venv /python-venv
ENV PATH="/python-venv/bin:$PATH"

COPY . /code
WORKDIR /code

ENV PYTHONUNBUFFERED 1
