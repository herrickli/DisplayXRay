import os
import json
import xml.etree.ElementTree as ET

# 构造图片数据
img_dir = 'Images'
ann_dir = 'Annotations'

img_list = os.listdir(img_dir)
img_list.sort()

data = {}

for name in img_list:
    img_info = {}

    img_path = os.path.join(img_dir)
    ann_path = os.path.join(ann_dir, name.split('.')[0] + '.xml')

    root = ET.parse(ann_path).getroot()
    height = root.find('size').find('height').text
    width = root.find('size').find('width').text
    img_info['size'] = [width, height]
    img_info['filepath'] = os.path.join('./data', img_path, name)
    
    objs = root.findall('object')
    objs_info = []
    name_list = []
    for obj in objs:
        obj_info = {}
        objname = obj.find('name').text
        bndbox = obj.find('bndbox')
        xmin = bndbox.find('xmin').text
        xmax = bndbox.find('xmax').text
        ymin = bndbox.find('ymin').text
        ymax = bndbox.find('ymax').text
        box = [xmin, ymin, xmax, ymax]
        name_list.append(objname)
        obj_info['name'] = objname
        obj_info['box'] = box
        objs_info.append(obj_info)
    
    img_info['objects'] = objs_info
    img_info['names'] = name_list
    data[name] = (img_info)
print(data)
with open('../data.json', 'w') as f:
    json.dump(data, f)