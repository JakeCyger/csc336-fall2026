let rooms = {

                "The Hall of Locked Doors" : {

                    name: "The Hall of Locked Doors",
                    desc: "A long, dimply lit corridor featuring tall wooden panels on the wall with many different sized doors. In the center of the room at the end of the hallway lies a glass table with a key and a bottle labeled 'DRINK ME!' There is also a drop-shaped pool nearby and a mirror.",
                    linkedRooms: [
                        { label: "Wade into the salty water", destination: "The Sunken Tear Pool" },
                        { label: "Venture into the mirror", destination: "The Glass Mirror Maze" }
                    ],
                    traversalMSG: "Welcome to Wonderland..."

                },

                "The Sunken Tear Pool": {

                    name: "The Sunken Tear Pool",
                    desc: "A large chamber completely filled waist deep with a salty, shimmering blue water. Giant hankerchiefs served as lily pads, and a massive, oversized glass bottle drifted nearby, large enough to step inside.",
                    linkedRooms: [
                        { label: "Return to the corridor", destination: "The Hall of Locked Doors" },
                        { label: "Follow the purple smoke", destination: "The Caterpillar's Mushroom Forest" }
                    ],
                    traversalMSG: "You wade into a large drop-shaped body of water..."

                },

                "The Caterpillar's Mushroom Forest": {

                    name: "The Caterpillar's Mushroom Forest",
                    desc: "A damp towering forest filled with bioluminescent, oversized mushrooms taller than trees! Thick, sweet-smelling purple smoke drifts through the air, obscuring the path, while enormous glowing spores drift gently down from the canopy.",
                    linkedRooms: [
                        { label: "Head back toward the pool", destination: "The Sunken Tear Pool" },
                        { label: "Follow the sound of clinking teacups", destination: "The Mad Tea Party Garden" },
                        { label: "Walk toward a gleaming hallway", destination: "The Glass Mirror Maze" }
                    ],
                    traversalMSG: "You feel a compulsion to walk further into the forest..."

                },

                "The Glass Mirror Maze": {

                    name: "The Glass Mirror Maze",
                    desc: "A disorienting gallery made entirely of polished, reflective silver mirrors and twisting glass archways. Reflections don't always mimic the viewers movements here, the boundary between floor and doorway is also blurred by optical illusions!",
                    linkedRooms: [
                        { label: "Escape back to the wooden doors", destination: "The Hall of Locked Doors" },
                        { label: "Push deeper into the glowing mushrooms", destination: "The Caterpillar's Mushroom Forest" },
                        { label: "Approach the red-and-white garden gates", destination: "The Queen's Rose Courtyard" }
                    ],
                    traversalMSG: "You find yourself... multiple of yourself, alone in a maze..."

                },

                "The Mad Tea Party Garden": {

                    name: "The Mad Tea Party Garden",
                    desc: "An overgrown, sun-dappled garden centered around an endlessly long wooden table piled high with teacups, smoking kettles, and stale pastries. Topiary hedge walls frame the space, and clockwork pocket watches hand from the branches of weeping willow trees.",
                    linkedRooms: [
                        { label: "Retreat into the mushroom forest", destination: "The Caterpillar's Mushroom Forest" },
                        { label: "Sneak into the checkerboard courtyard", destination: "The Queen's Rose Courtyard" }
                    ],
                    traversalMSG: "You stumble upon what seems like an abandonded party..."

                },

                "The Queen's Rose Courtyard": {

                    name: "The Queen's Rose Courtyard",
                    desc: "A stark, geometrically rigid courtyard with a checkerboard marble floor. Massive white rose bushes line the stone walls, many dripping with fresh red paint. Armored playing-card soldiers stand guard along the perimeter balconies.",
                    linkedRooms: [
                        { label: "Slip back out to the Tea Party", destination: "The Mad Tea Party Garden" },
                        { label: "Run back into the mirror gallery", destination: "The Glass Mirror Maze" }
                    ],
                    traversalMSG: "You avoid the guards on the way in but it might not be so easy on the way out..."

                },

            };

let currentRoom = rooms["The Hall of Locked Doors"];
let rootDiv = document.querySelector("#rootDiv");

function navigationClick(e) {
    let nextRoomKey = e.target.destination
    currentRoom = rooms[nextRoomKey];
    visualizeMsg(currentRoom.traversalMSG);
};

function msgClick(e) {
    visualizeRoom();
}

function visualizeRoom() {

    rootDiv.innerHTML = "";
    
    let roomTitle = document.createElement("h1");
    roomTitle.innerHTML = currentRoom.name;
    rootDiv.append(roomTitle);

    let roomDesc = document.createElement("p");
    roomDesc.innerHTML = currentRoom.desc;
    rootDiv.append(roomDesc);
    
    for (let i = 0; i < currentRoom.linkedRooms.length; i++) {
        let exit = currentRoom.linkedRooms[i]
        console.log(exit)
        let navButton = document.createElement("button")
        navButton.innerHTML = exit.label
        navButton.destination = exit.destination
        navButton.addEventListener("click", navigationClick);
        rootDiv.append(navButton);
    }

};

function visualizeMsg(msg) {

    rootDiv.innerHTML = ""
    let msgp = document.createElement("P")
    msgp.innerHTML = msg
    rootDiv.append(msgp)

    let contButton = document.createElement("button")
    contButton.innerHTML = "CONTINUE"
    contButton.addEventListener("click", msgClick)
    rootDiv.append(contButton)

}

visualizeMsg("Welcome to Wonderland...")