# Install guide for an AI assistant (Claude Code / Codex)

The user wants the two bosses in this folder on their own Minecraft server. Talk to them in Thai, keep it short,
and ask before every step that changes files outside this folder.

## What is in this folder

- `server-files/plugins/` — ready to merge into the server's `plugins/` folder:
  - `ModelEngine/blueprints/vreki_bosses/*.bbmodel` (4 models)
  - `MythicMobs/packs/vreki_bosses/` (`packinfo.yml`, `mobs/`, `skills/`)
- `server-files/datapacks/vreki_boss_arenas/` — data pack with the two arenas (structures) and the functions
  `vreki_bosses:akkrakhong_arena` and `vreki_bosses:vesper_arena`.
- `bosses/` — the same boss files as the AIs delivered them (reference only; do not copy them a second time).

## Steps

1. **Ask the user for the server folder** (the folder with the Paper `.jar` and `server.properties`). Do not search
   the whole disk.
2. **Check what is there and tell the user what you found:**
   - Paper for Minecraft **1.21.11** (jar name, or `version_history.json`).
   - `plugins/` has a MythicMobs jar (**5.13**, Premium was used for the clip) and a ModelEngine jar (**4.1**).
     If one is missing, stop and tell the user: both are bought/downloaded by the user from their official pages.
     Never download plugin jars yourself.
   - The world folder name: `level-name` in `server.properties` (default `world`).
   - Java 21: `java -version`.
3. **Ask the user to stop the server** if it is running (files must not change under a running server).
4. **Copy, without deleting anything that is already there** (ask first if a file with the same name exists):
   - `server-files/plugins/ModelEngine/blueprints/vreki_bosses/` → `<server>/plugins/ModelEngine/blueprints/vreki_bosses/`
   - `server-files/plugins/MythicMobs/packs/vreki_bosses/` → `<server>/plugins/MythicMobs/packs/vreki_bosses/`
   - `server-files/datapacks/vreki_boss_arenas/` → `<server>/<level-name>/datapacks/vreki_boss_arenas/`
     (create `datapacks/` if the world folder exists but has none; if the world folder does not exist yet,
     create `<server>/<level-name>/datapacks/` and put it there — the server loads it when it makes the world)
5. **Check the copy:** list the copied files and compare their sizes with the ones in `server-files/`.
6. **Do not start the server yourself** (it keeps running and blocks this chat). Tell the user, in Thai:
   - start the server; ModelEngine builds `plugins/ModelEngine/resource pack.zip` on start
   - the game client must use that resource pack, or the bosses are invisible: copy it to the game's
     `resourcepacks` folder and turn it on (or host it with the server's `resource-pack` setting)
   - in game, as OP, standing on open ground: `/function vreki_bosses:akkrakhong_arena` (ChatGPT's boss) or
     `/function vreki_bosses:vesper_arena` (Claude's boss), then click the red chat line and press Enter to spawn
     the boss; if the world is not named `world`, change that word in the command first
   - warning: the arena replaces every block in 64 × 64 × 57 around them (9 below their feet), so not near builds
   - like the clip: `/difficulty hard`, `/time set night`, `/gamerule spawn_monsters false`
7. If the server log shows errors from MythicMobs or ModelEngine after the user starts it, ask them to paste the
   lines and read them together. Do not edit the boss files to "fix" things without asking.

Uninstall: delete the three `vreki_bosses` / `vreki_boss_arenas` folders above (ask the user first).
