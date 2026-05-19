import json
with open('data/malaysia.geojson') as f:
    geo = json.load(f)
geo.pop('crs', None)
with open('data/malaysia.geojson', 'w') as f:
    json.dump(geo, f)
print('Done — crs field removed')