FROM docker.elastic.co/elasticsearch/elasticsearch:7.16.3
RUN elasticsearch-plugin install analysis-kuromoji
