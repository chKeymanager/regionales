import mysql.connector
import requests
import dateparser
from elastic import Elastic


# Configura las credenciales de autenticación
user = "elastic"
password = "YYQIQ5a3wFhicSowEk6H"

# Configura el host y puerto de Elasticsearch
host = "148.203.237.240"
port = 9200

# Crea la instancia de Elasticsearch
es = Elastic(host,port,user,password)


result = es.get_all_docs('gs1-rep-fact-2023.04.01')


# Preparar los datos para exportación a MySQL
data = []
for doc in result:
    source = doc['_source']
    data.append({
        'numero_asociado': source['numero_asociado'],
        'ramo_industrial': source['ramo_industrial'],
        'clave_del_producto': source['clave_del_producto'],
        'estado': source['estado'],
        'fecha_factura': dateparser.parse(source['fecha_factura']).strftime('%Y-%m-%d %H:%M:%S') if source['fecha_factura'] is not None else None, 
        'fecha_ingreso': dateparser.parse(source['fecha_ingreso']).strftime('%Y-%m-%d %H:%M:%S') if source['fecha_ingreso'] is not None else None
    })

# Conectarse a MySQL
cnx = mysql.connector.connect(
    user='dev',
    password='Postech2021!',
    host='localhost',
    database='regionales'
)

# Insertar los datos en la tabla de MySQL
cursor = cnx.cursor()
for d in data:
    query = "INSERT INTO rep_fact (numero_asociado, ramo_industrial, clave_del_producto, estado, fecha_factura, fecha_anualidad) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (d['numero_asociado'], d['ramo_industrial'], d['clave_del_producto'], d['estado'], d['fecha_factura'], d['fecha_ingreso'])
    cursor.execute(query, values)
cnx.commit()

