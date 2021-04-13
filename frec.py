import numpy as np

import cv2

detector = cv2.CascadeClassifier("haarcascade_fullbody.xml")

cap = cv2.VideoCapture("cap.mp4")

frame = 0

while(True):

    ret, img = cap.read()

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = detector.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:

        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
        status = cv2.imwrite(
            './images/'+'faces_detected'+str(frame)+'.jpg', img)
        frame += 1
        print("[INFO] Image faces_detected.jpg written to filesystem: ", status)

    cv2.imshow('frame', img)

    if cv2.waitKey(1) & 0xFF == ord('q'):

        break

cap.release()

cv2.destroyAllWindows()