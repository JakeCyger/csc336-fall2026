let rooms = {

                "Hall of Locked Doors" : {

                    name: "Hall of Locked Doors",
                    desc: "A long, dimply lit corridor featuring tall wooden panels on the wall with many different sized doors. In the center of the room at the end of the hallway lies a glass table with a key and a bottle labeled 'DRINK ME!'",
                    linkedRooms: ["The Sunken Tear Pool", "The Glass Mirror Maze"]

                },

                "The Sunken Tear Pool": {

                    name: "The Sunken Tear Pool",
                    desc: "A large chamber completely filled waist deep with a salty, shimmering blue water. Giant hankerchiefs served as lily pads, and a massive, oversized glass bottle drifted nearby, large enough to step inside.",
                    linkedRooms: ["The Hall of Locked Doors", "The Caterpillar's Mushroom Forest"]

                },

                "The Caterpillar's Mushroom Forest": {

                    name: "The Caterpillar's Mushroom Forest",
                    desc: "A damp towering forest filled with bioluminescent, oversized mushrooms taller than trees! Thick, sweet-smelling purple smoke drifts through the air, obscuring the path, while enormous glowing spores drift gently down from the canopy.",
                    linkedRooms: ["The Sunken Tear Pool", "The Mad Tea Party", "The Glass Mirror Maze"]

                },

                "The Glass Mirror Maze": {

                    name: "The Glass Mirror Maze",
                    desc: "A disorienting gallery made entirely of polished, reflective silver mirrors and twisting glass archways. Reflections don't always mimic the viewers movements here, the boundary between floor and doorway is also blurred by optical illusions!",
                    linkedRooms: ["The Hall of Locked Doors", "The Caterpillar's Mushrooom Forest", "The Queen's Rose Courtyard"]

                },

                "The Mad Tea Party Garden": {

                    name: "The Mad Tea Party Garden",
                    desc: "An overgrown, sun-dappled garden centered around an endlessly long wooden table piled high with teacups, smoking kettles, and stale pastries. Topiary hedge walls frame the space, and clockwork pocket watches hand from the branches of weeping willow trees.",
                    linkedRooms: ["The Caterpillar's Mushroom Forest","The Queen's Rose Courtyard"]

                },

                "The Queen's Rose Courtyard": {

                    name: "The Queen's Rose Courtyard",
                    desc: "A stark, geometrically rigid courtyard with a checkerboard marble floor. Massive white rose bushes line the stone walls, many dripping with fresh red paint. Armored playing-card soldiers stand guard along the perimeter balconies.",
                    linkedRooms: ["The Mad Tea Party", "The Glass Mirror Maze"]

                },

            };
            
let currentRoom = rooms["Hall of Locked Doors"];
let rootDiv = document.querySelector("#rootDiv");

function navigationClick(e) {
    console.log(e.target.innerHTML);
    currentRoom = rooms[e.target.innerHTML];
    visualizeRoom();
};

function visualizeRoom() {

    rootDiv.innerHTML = "";
    
    let roomTitle = document.createElement("h1");
    roomTitle.innerHTML = currentRoom.name;
    rootDiv.append(roomTitle);

    let roomDesc = document.createElement("p");
    roomDesc.innerHTML = currentRoom.desc;
    rootDiv.append(roomDesc);
    
    for (let i = 0; i < currentRoom.linkedRooms.length; i++) {
        let navButton = document.createElement("button")
        navButton.innerHTML = currentRoom.linkedRooms[i];
        navButton.addEventListener("click", navigationClick);
        rootDiv.append(navButton);
    }

};

visualizeRoom()