from elasticsearch import Elasticsearch
import requests
import csv

# Configura las credenciales de autenticación
user = "elastic"
password = "YYQIQ5a3wFhicSowEk6H"

# Configura el host y puerto de Elasticsearch
host = "148.203.237.240"
port = 9200

# Crea una sesión de autenticación con requests
session = requests.Session()
session.auth = (user, password)

# Crea la instancia de Elasticsearch
es = Elasticsearch([f"http://{user}:{password}@{host}:{port}"])

# Verifica que la conexión funciona correctamente
if es.ping():
    print("Conexión exitosa.")
else:
    print("Error al conectar.")

# Realizar una consulta
size = 10000
query = {
	
    "match_all": {}
}

# Campos que deseas incluir en el dump CSV
campos = ["numero_asociado", "ramo_industrial", "clave_del_producto", "estado", "fecha_factura"]

# Nombre del archivo CSV
archivo_csv = "rep_fact.csv"

# Realiza la consulta a Elasticsearch
resultados = es.search(index="rep-fact", query=query, size=size)

# Abre el archivo CSV para escribir los resultados
with open(archivo_csv, mode='w', newline='') as archivo:
    escritor_csv = csv.writer(archivo, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

    # Escribir los encabezados de los campos en el archivo CSV
    escritor_csv.writerow(campos)

    # Escribir los datos de cada documento en el archivo CSV
    for resultado in resultados['hits']['hits']:
        fila = []
        for campo in campos:
            if campo in resultado['_source']:
                fila.append(resultado['_source'][campo])
            else:
                fila.append("")
        escritor_csv.writerow(fila)

print("El dump en CSV se ha creado correctamente en el archivo: ", archivo_csv)
