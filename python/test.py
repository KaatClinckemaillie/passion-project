import cv2
import pygame

video_path = 'path/to/video'
cap = cv2.VideoCapture(video_path)
success, frame = cap.read()
shape = frame.shape[1::-1]
screen = pygame.display.set_mode(shape)
clock = pygame.time.Clock()
frame_counter = 0
FPS = 30

while success:
    clock.tick(FPS)
    success, frame = cap.read()
    frame_counter += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            success = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_a:
                video_path = 'path/to/video'
                cap = cv2.VideoCapture(video_path)
                success, frame = cap.read()
            if event.key == pygame.K_b:
                video_path = 'path/to/video'
                cap = cv2.VideoCapture(video_path)
                success, frame = cap.read()

    if frame_counter == cap.get(cv2.CAP_PROP_FRAME_COUNT):
        frame_counter = 0 #Or whatever as long as it is the same as next line
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    
    try:
        screen.blit(pygame.image.frombuffer(frame.tobytes(), shape, "BGR"), (0, 0))
    except:
        cap = cv2.VideoCapture(video_path)
        success, frame = cap.read()



    pygame.display.update()

   

pygame.quit()