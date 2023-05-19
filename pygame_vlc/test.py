import pygame
import subprocess

# Instellingen voor de weergave
screen_width = 800
screen_height = 600
rotation_point = (screen_width // 2, screen_height // 2)

# Lijst met video's om af te spelen
videos = ['video1.mp4', 'video2.mp4', 'video3.mp4']
current_video_index = 0

# Initialisatie van Pygame
pygame.init()
screen = pygame.display.set_mode((screen_width, screen_height))

# Functie om een video af te spelen
def play_video(video_path):
    subprocess.call(['omxplayer', '-o', 'hdmi', video_path])

# Functie om een oppervlak te roteren
def rotate_surface(surface, angle):
    rotated_surface = pygame.transform.rotate(surface, angle)
    rotated_rect = rotated_surface.get_rect(center=rotation_point)
    return rotated_surface, rotated_rect

# Hoofdprogramma
running = True
current_rotation_angle = 0
previous_rotation_angle = 0

while running:
    # Toetsgebeurtenissen verwerken
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:  # Bij spatiebalk wisselen van video
                current_rotation_angle = (current_rotation_angle + 90) % 360
                previous_rotation_angle = current_rotation_angle
                current_video_index = (current_video_index + 1) % len(videos)
                video_path = videos[current_video_index]
                play_video(video_path)

    # Scherm leegmaken
    screen.fill((0, 0, 0))

    # Laad de vorige video en roteer deze
    previous_video_index = (current_video_index - 1) % len(videos)
    previous_video_path = videos[previous_video_index]
    previous_surface = pygame.image.load(previous_video_path).convert()
    previous_surface_rotated, previous_rect_rotated = rotate_surface(previous_surface, previous_rotation_angle)
    screen.blit(previous_surface_rotated, previous_rect_rotated)

    # Laad de huidige video en roteer deze
    current_video_path = videos[current_video_index]
    current_surface = pygame.image.load(current_video_path).convert()
    current_surface_rotated, current_rect_rotated = rotate_surface(current_surface, current_rotation_angle)
    screen.blit(current_surface_rotated, current_rect_rotated)

    # Scherm bijwerken
    pygame.display.flip()

# Pygame afsluiten
pygame.quit()
