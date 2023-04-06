#Clase para conectar con elasticsearch
from elasticsearch import Elasticsearch


class Elastic():
    
    def __init__(self,hosts,port,user='',password='',scheme='http'):
        opt = {'hosts':[hosts],'scheme':scheme,'port':port}
        if user != '' and password != '':
            opt['http_auth'] = (user,password)
        self.els = Elasticsearch(**opt)


    def Clusterhealth(self):
        return self.els.cluster.health()


    def search_by_query_score(self, index, query='', size=10000, source=['*'], min_score=1.0, sort=None):
        data = []
        max_score = None
        result = self.els.search(index=index, size=size, _source=source, min_score=min_score, sort=sort)
        if query != '':
            result = self.els.search(index=index, query=query, size=size, _source=source, min_score=min_score, sort=sort)
        if len(result['hits']['hits']) > 0:
            max_score = result['hits']['max_score']
            data = result['hits']['hits']
        return data, max_score


    def search_by_query(self,index,query='',size=10000,source=['*'], sort=None):
        data = []
        result = self.els.search(index=index,size=size,_source=source,sort=None)
        if query != '':
            result = self.els.search(index=index,query=query,size=size,_source=source,sort=sort)
        if len(result['hits']['hits']) > 0:
            data = result['hits']['hits']
        return data


    def search_by_body(self,index, body='', size=10000):
        data = []
        result = self.els.search(index=index, size=size)
        if body != '':
            result = self.els.search(index=index, body=body, size=size)
        if len(result['hits']['hits']) > 0:
            return result['hits']['hits']
        return None


    def get_all_docs(self,index,query='',size=10000,source=['*'],scroll='5m'):
        data = []
        result = self.els.search(index=index, size=size, scroll=scroll, _source=source)
        if query != '':
            result = self.els.search(index=index, query=query, size=size, scroll=scroll, _source=source)
        scroll_id = result['_scroll_id']
        while(len(result['hits']['hits'])):
            data.extend(result['hits']['hits'])
            result = self.els.scroll(scroll_id=scroll_id,scroll='1s')
            scroll_id = result['_scroll_id']
        return data


    def search_by_aggs(self,index,body='',size=0):
        if body == '':
            return []
        result = self.els.search(index=index,body=body,size=size)
        return result['aggregations']
    

    def update_by_query(self, index, query):
        result = self.els.update_by_query(index, body=query)
        return result
