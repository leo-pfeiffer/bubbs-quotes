import time
import random


def get_daily_rand() -> float:
    seed = int(time.time() // (24 * 60 * 60))
    random.seed(seed)
    return random.random()


def get_random_index(length: int, rnd: float) -> int:
    return int(length * rnd)
