import cv2
import time

def qrscan():

    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Error: Could not open camera.")
        return []

    scanned_codes = set()

    detector = cv2.QRCodeDetector()

    print("QR Code Scanner started. Press ENTER or ESC to stop.")

    while True:

        ret, frame = cap.read()

        if not ret:
            print("Error: Could not read frame.")
            break

        data, points, _ = detector.detectAndDecode(frame)

        if data:
            
            if data not in scanned_codes:
                print("SCANNED:", data)
                scanned_codes.add(data)

            if points is not None:
                points = points.astype(int)

                for i in range(len(points[0])):
                    cv2.line(
                        frame,
                        tuple(points[0][i]),
                        tuple(points[0][(i+1) % len(points[0])]),
                        (0,255,0),
                        3
                    )

            cv2.putText(
                frame,
                data,
                (50,50),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0,255,0),
                2
            )


        cv2.imshow("QR Scanner", frame)


        key = cv2.waitKey(1)

        if key == 27 or key == 13:  # ESC or ENTER
            break


    cap.release()
    cv2.destroyAllWindows()

    return list(scanned_codes)