import json
import os

# Load the GeoJSON file
geojson_file = ''  # Change to your GeoJSON file's path
with open(geojson_file, 'r') as file:
    geojson_data = json.load(file)

# Directory of output files
output_dir = ''
os.makedirs(output_dir, exist_ok=True)

# Helper function to convert coordinates to JavaScript object format
def convert_coordinates(coords):
    if isinstance(coords[0], list):  # For LineString or Polygon geometries
        return ", ".join([convert_coordinates(coord) for coord in coords])
    else:
        lng, lat = map(float, coords)  # Ensure each coordinate is a float #Need to include lng, lat only for wind. 
        # Format as JavaScript object without extra quotes
        return f"{{ lat: {lat}, lng: {lng}, altitude: {7000} }}" #need to adjust this for CONE and PEAK SURGE



# Iterate through each feature in the GeoJSON
for index, feature in enumerate(geojson_data['features']):
    geometry = feature.get('geometry', {})
    properties = feature.get('properties', {})
    
    feature_name = properties.get('name', 'Unnamed')
    feature_type = geometry.get('type', 'Unknown')
    feature_coordinates = geometry.get('coordinates', [])

    # Convert coordinates to JavaScript-friendly format
    converted_coordinates = f"[{convert_coordinates(feature_coordinates)}]"

    # Define the JavaScript 
    js_content = f"""
    const feature{index} = {{
        name: "{feature_name}",
        type: "{feature_type}",
        coordinates: {converted_coordinates}
    }};
    export default feature{index};
    """

    # Define the filename
    filename = os.path.join(output_dir, f'feature_{index + 1}.js')

    # Write the JavaScript file
    with open(filename, 'w') as js_file:
        js_file.write(js_content.strip())
        print(f'Saved {filename}')

print("All features have been processed.")
