import random

# --- Прогрессии аккордов: (ступени, пример) ---
chord_progressions = [
    ("i-vi-III-VII", "W.A.S.P. – Sleeping (In The Fire) – куплет"),
    ("I-V-vi-IV", "Cinderella – Don’t Know What You Got – припев"),
    ("VI-VII-i-iv", "Kingdom Come – What Love Can Be – припев"),
    ("I-V-vi-IV", "Aerosmith – I Don’t Want to Miss a Thing – куплет"),
    ("i-iv-V-i", "Scorpions – Still Loving You – куплет"),
    ("vi-IV-I-V", "Ozzy Osbourne – Mama I’m Coming Home – куплет"),
    ("i-iv-VII-III", "Guns N’ Roses – Don’t Cry – куплет"),
    ("I-V-vi-IV", "Bon Jovi – Always – куплет"),
    ("I-V-vi-IV", "Skid Row – I Remember You – припев"),
    ("I-bVII-IV", "Guns N’ Roses – Patience – вступление"),
]

# --- Тональности и аккорды ---
scales = {
    "Am":  ["Am", "Bm♭5", "C", "Dm", "Em", "F", "G"],
    "Em":  ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
    "G":   ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
    "D":   ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
    "Bm":  ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
    "F#m": ["F#m", "G#dim", "A", "Bm", "C#m", "D", "E"],
    "E":   ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
    "Eb":  ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Ddim"],
}

# --- Ритмические паттерны ---
rhythmic_patterns = [
    ("I : X-1-(2,3)-1", "Bon Jovi – Always"),
    ("I - V : (1,2,3)-X-(1,2,3)-X", "The Beatles – Let It Be"),
    ("I - V - I - V : 1-2-3-2", "Scorpions – Still Loving You"),
    ("I - V : 1-2-3-1-2-3", "Journey – Open Arms (6/8)"),
    ("I : X-(1,2,3)-(1,2,3)", "Guns N’ Roses – Patience (3/4)"),
]

# --- Вспомогательная функция для транспонирования ступеней ---
def transpose_degrees_to_chords(scale_name, degrees_str):
    scale = scales[scale_name]
    degree_map = {
        "I": 0, "II": 1, "III": 2, "IV": 3, "V": 4, "VI": 5, "VII": 6,
        "i": 0, "ii": 1, "iii": 2, "iv": 3, "v": 4, "vi": 5, "vii": 6,
        "bVII": 6  # в мажоре это ступень из параллельного минорного
    }
    chords = []
    for deg in degrees_str.replace("-", " ").split():
        if "b" in deg:
            base = deg.replace("b", "")
            idx = degree_map.get(base.upper(), 0) - 1
        else:
            idx = degree_map.get(deg, 0)
        chords.append(scale[idx % len(scale)])
    return chords

# --- Генерация секвенции ---
def generate_sequence():
    prog_degrees, song = random.choice(chord_progressions)
    tonality = random.choice(list(scales.keys()))
    chords = transpose_degrees_to_chords(tonality, prog_degrees)
    pattern, pattern_song = random.choice(rhythmic_patterns)

    print("🎵 Прогрессия:", prog_degrees, f"({song})")
    print(f"🎼 Тональность {tonality}:| ", " | ".join(chords)+" |")
    print(f"🪘 Ритмический паттерн (из {pattern_song}):")
    print(pattern)

# --- Запуск ---
if __name__ == "__main__":
    generate_sequence()
