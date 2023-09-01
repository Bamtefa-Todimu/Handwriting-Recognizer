from flask import Flask, request, make_response, jsonify
from flask_cors import CORS, cross_origin
import cv2
import pandas as pd
import numpy as np
import tensorflow as tf
import typing

app = Flask(__name__)
cors = CORS(app)

reloaded = tf.saved_model.load('flask__backend/translator_93')


def resize_maintaining_aspect_ratio(image: np.ndarray, width_target: int, height_target: int, padding_color: typing.Tuple[int] = (255, 255, 255)) -> np.ndarray:

    height, width = image.shape[:2]
    ratio = min(width_target / width, height_target / height)
    new_w, new_h = int(width * ratio), int(height * ratio)

    resized_image = cv2.resize(image, (new_w, new_h))
    delta_w = width_target - new_w
    delta_h = height_target - new_h
    top, bottom = delta_h//2, delta_h-(delta_h//2)
    left, right = delta_w//2, delta_w-(delta_w//2)

    new_image = cv2.copyMakeBorder(
        resized_image, top, bottom, left, right, cv2.BORDER_CONSTANT, value=padding_color)

    return new_image


def thresholding(image):
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(img_gray, 130, 255, cv2.THRESH_BINARY_INV)
    # plt.imshow(thresh, cmap='gray')
    return thresh


def seperateLine(img):
    thresh_img = thresholding(img)
    # dilation
    kernel = np.ones((10, 250), np.uint8)
    dilated = cv2.dilate(thresh_img, kernel, iterations=1)

    (contours, hierarchy) = cv2.findContours(
        dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    sorted_contours_lines = sorted(
        contours, key=lambda ctr: cv2.boundingRect(ctr)[1])

    lines_list = []

    for ctr in sorted_contours_lines:
        x, y, w, h = cv2.boundingRect(ctr)
        lines_list.append([x, y, x+w, y+h])

        # cv2.rectangle(img2, (x, y), (x+w, y+h), (40, 100, 250), 2)

    no_of_lines = len(lines_list)

    # second_line = lines_list[no_of_lines-1]
    lines = [img[second_line[1]:second_line[3], second_line[0]:second_line[2]]
             for second_line in lines_list]

    return lines


@app.route('/', methods=['GET'])
def job():
    print("backend live")

    _ = reloaded.translate(resize_maintaining_aspect_ratio(
        cv2.imread('flask__backend/uploaded_images/saved.jpg'), 1408, 96))

    return jsonify({"1": "ra"})


@app.route('/upload', methods=['OPTIONS', 'POST'])
@cross_origin()
def upload():

    if 'image' not in request.files:
        return 'No image file found', 400

    image = request.files['image']
    print(image.filename)
    # Save the image to a file
    image.save('flask__backend/uploaded_images/'+image.filename)

    lines = seperateLine(cv2.cvtColor(cv2.imread(
        'flask__backend/uploaded_images/'+image.filename), cv2.COLOR_BGR2RGB))
    result = []
    new_result = []
    for line in lines:
        result.append(reloaded.translate(
            resize_maintaining_aspect_ratio((line), 1408, 96)))
    for resut in result:
        new_result.append(resut[0].numpy().decode())
    return jsonify({"result": new_result})


if __name__ == '__main__':
    app.run()
