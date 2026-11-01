# Places akkrakhong_arena (64 x 64) around you: you stay on the player start facing the boss spot (18 blocks north), then chat offers the spawn command for that spot.
place template vreki_bosses:akkrakhong_arena ~-31 ~-9 ~-50
tp @s ~ ~ ~ 180 0
kill @e[type=item,distance=..80]
execute positioned ~1 ~ ~-18 summon minecraft:marker run tag @s add vreki_bosses_spot
data modify storage vreki_bosses:spawn boss set value "AK_Akkrakhong"
execute store result storage vreki_bosses:spawn x int 1 run data get entity @n[type=minecraft:marker,tag=vreki_bosses_spot] Pos[0]
execute store result storage vreki_bosses:spawn y int 1 run data get entity @n[type=minecraft:marker,tag=vreki_bosses_spot] Pos[1]
execute store result storage vreki_bosses:spawn z int 1 run data get entity @n[type=minecraft:marker,tag=vreki_bosses_spot] Pos[2]
kill @e[type=minecraft:marker,tag=vreki_bosses_spot]
function vreki_bosses:spawn_hint with storage vreki_bosses:spawn
