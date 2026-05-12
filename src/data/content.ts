// ============================================================
// ALL CONTENT DATA — extracted from original App.tsx
// Edit this file to update projects, experience, and personal info
// ============================================================

export const personalInfo = {
  name: "Catherine Boss",
  degree: "Mechanical Engineering",
  minor: "Minor in Mechatronics",
  school: "Penn State University",
  classYear: "Class of 2027",
  tagline: "I'm an engineer driven by a desire to be useful, make meaningful contributions, and lead with purpose.",
  bio: "I'm a third-year Mechanical Engineering student with a passion for problem-solving and hands-on design. What excites me most is taking things apart, improving them, and leaving them better than I found them. I enjoy working with people just as much as I enjoy digging into a project on my own, and I feel at home leading discussions or presenting in front of a crowd. No matter where I am, I try to bring kindness, energy, and a positive attitude. Ultimately, I want to explore a wide variety of engineering experiences that will help shape my future while keeping curiosity and fun at the center of everything I do.",
  email: "catherineboss27@gmail.com",
  linkedin: "https://www.linkedin.com/in/catherine-boss-030207289/",
  github: "https://github.com/Cat-B",
  resumeUrl: "/CBoss_Resume.pdf",
  headshot: "https://i.imgur.com/FgJr1hj.jpeg",
  groupPhoto: "https://i.imgur.com/H6dWrSv.jpeg",
  skills: {
    whatIDo: ["SolidWorks/CAD", "3D Printing", "Mechatronics", "Hands-On Solving"],
    whoIAm: ["Organized", "Energetic", "Curious", "Communicative"],
  },
  // Fun facts for cutting board cards — swap text as desired
  funFacts: [
    {
      label: "Fresh Fact",
      title: "Drone Show Crew",
      body: "Flew and maintained UAVs for live drone shows at Sky Elements — the spark that ignited my passion for aerospace engineering.",
    },
    {
      label: "Fun Fact",
      title: "Pyrotechnics Pro",
      body: "Wired professional fireworks displays using COBRA modules and e-fuses before I could legally buy fireworks myself.",
    },
    {
      label: "Zesty Fact",
      title: "Penn State ASME Leader",
      body: "Serving as Dual Secretary for Penn State ASME — organizing tech talks, design teams, and a whole lot of engineering enthusiasm.",
    },
  ],
};

// Desert theme per project — subtle lemon-themed dessert watermark for detail pages
// Each project gets a different dessert. Swap emoji or image paths when you have Procreate art.
export interface Project {
  id: number;
  title: string;
  date: string;
  shortDescription: string;
  image: string;
  tech: string[];
  overview: string;
  mainBody: string | string[];
  outcomes: string;
  gallery: string[];
  pdfUrl?: string;
  dessertEmoji: string; // subtle lemon dessert watermark on detail page
  dessertName: string;
}

export const projectsData: Project[] = [
  {
    id: 40,
    title: "MATLAB Presentation",
    date: "October 2025",
    shortDescription: "ASME Tech Talk on the Utility of MATLAB — presented to ~100 engineers, one of the most-attended talks of the semester.",
    image: "https://i.imgur.com/99CDz4C.png",
    tech: ["Tech Talk", "Public Speaking", "Professional Communication", "AI Integration", "Technical Presentation", "MATLAB"],
    overview: "As the Dual Secretary for the Penn State chapter of ASME, I work closely with both the executive board and multiple design teams to support technical engagement within the organization. Early in the semester, I delivered a large-scale technical presentation focused on MATLAB, a tool that many undergraduate engineers approach with hesitation or frustration. My goal was to reframe MATLAB as an accessible, powerful engineering resource when used correctly, and to demonstrate its relevance across coursework, design teams, and real-world engineering applications.",
    mainBody: [
      "This presentation took place during the second week of classes at one of our early design team meetings and was attended by roughly 100 ASME members, ranging from first-year students to seniors. I spent a significant amount of time preparing custom MATLAB scripts, slides, and demonstrations designed to meet students at different experience levels. Rather than assuming prior comfort with the software, I focused on fundamentals, clarity, and practical use cases, emphasizing that many frustrations stem from how MATLAB is introduced rather than from the tool itself.",
      "To make the talk concrete and engaging, I built live demonstrations drawing from thermodynamics, vibrations, and data visualization. These examples reflected coursework I was actively using MATLAB for, particularly in my junior-year vibrations class, and showcased how the software can streamline problem-solving and enhance understanding. I also discussed how MATLAB concepts translate cleanly into other programming languages and how it can interface with hardware platforms such as Raspberry Pi and Arduino, broadening its usefulness beyond purely academic settings.",
      "A key section of the presentation addressed the responsible use of AI in programming. I emphasized using AI as a learning aid rather than a replacement for understanding, showing how it can support debugging, exploration, and efficiency without undermining engineering intuition or problem-solving skills. Throughout the process, I coordinated with ASME leadership and design team leads, balancing stakeholder input while maintaining clear boundaries so the presentation remained focused, cohesive, and true to my original intent. The result was one of the most well-attended Tech Talks hosted by an ASME member that semester.",
    ],
    outcomes: "This project strengthened my ability to plan and deliver a large technical talk to a diverse audience while maintaining confidence and clarity. I gained experience communicating with multiple stakeholders, defending my technical perspective professionally, and presenting content I genuinely care about. I also deepened my own understanding of MATLAB and emerging AI-assisted workflows, which made the project both educational and enjoyable. Most importantly, the experience reinforced the value of advocacy for good tools and good practices — especially when they are misunderstood — and showed me how thoughtful communication can shift perspectives and encourage growth within an engineering community.",
    gallery: [
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    pdfUrl: "/matlab_talk.pdf",
    dessertEmoji: "🍋",
    dessertName: "Lemon Tart",
  },
  {
    id: 35,
    title: "EE210 Karaoke Machine",
    date: "Summer 2025",
    shortDescription: "Designed, prototyped, and soldered a five-block op-amp karaoke machine with tone, volume, and LED display.",
    image: "https://i.imgur.com/XWU0mm3.jpeg",
    tech: ["Soldering", "PCB Assembly", "Mechatronics", "Op-Amps", "Circuit Design"],
    overview: "In my EE210 Circuits and Devices course, I worked on a semester-long project that brought together the key concepts we learned throughout the class. The goal was to design and build a working karaoke machine by applying fundamentals like op-amps, resistors, capacitors, potentiometers, LEDs, and switches. This was one of my first major hands-on experiences with electronics, and it gave me a chance to see how classroom theory connects to real-world applications.",
    mainBody: "The circuit design was divided into five main parts: a mixer for combining microphone and music signals, a tone control stage for treble and bass adjustments, a volume control stage, a volume display using LEDs that responded to loudness, and an output driver with attenuation. I began the process by sketching the blocks on paper, then recreated the design in Multisim to simulate the system and troubleshoot potential issues. Once the simulation was complete, I tested the circuit on a breadboard to confirm that it worked before finally moving to a PCB. On the PCB, I soldered all the components and built a semi-functional karaoke machine that could play music with or without vocals and adjust the tone and volume in real time.",
    outcomes: "This project pushed me out of my comfort zone, since I started the class with very little electrical knowledge. Along the way, I learned how to work with op-amps in different configurations, how to approach problems methodically through simulation and testing, and how to solder and assemble a functional PCB. While the final result was not perfect, it gave me confidence in my ability to learn new technical skills, and it reinforced my interest in exploring the electrical side of my Mechatronics minor. Overall, I walked away with a stronger foundation in circuit design and an appreciation for the problem-solving process that comes with building hardware.",
    gallery: [
      "https://i.imgur.com/Q3VF4Hy.jpeg",
      "https://i.imgur.com/QDXGVsu.jpeg",
      "https://i.imgur.com/XWU0mm3.jpeg",
      "https://i.imgur.com/Z0wNYsV.jpeg",
      "https://i.imgur.com/Nm1VEUC.jpeg",
    ],
    pdfUrl: "/karaoke_final.pdf",
    dessertEmoji: "🍰",
    dessertName: "Lemon Pound Cake",
  },
  {
    id: 25,
    title: "ASME Hovercraft Project",
    date: "Spring 2025",
    shortDescription: "Contributed to a winning team hovercraft through fabrication, design file management, and final competition prep.",
    image: "https://i.imgur.com/1ChHnxY.jpeg",
    tech: ["Fusion360", "Team Work", "Organization", "Fabrication"],
    overview: "Through Penn State's ASME (American Society of Mechanical Engineers) club, I contributed to a team project focused on designing and competing with a small hovercraft. The challenge involved three teams each building a shoebox-sized hovercraft from scratch, with a competition taking place in March 2025. I joined the project in the spring semester after much of the core design work was completed, which gave me the opportunity to support the team through final iterations and preparation for the event.",
    mainBody: [
      "The hovercraft, named Driftstorm, pulled inspiration from fan boat acceleration structures. It featured two fan systems: one directed downward to inflate a skirt of nylon fabric that allowed the craft to hover above the floor, and another pointed backward to generate forward thrust. Steering was achieved by adjusting blades behind the rear fan, and the system was powered by lithium batteries. The skirt was a key component in ensuring the hovercraft could glide smoothly and maintain stability during operation.",
      "My contributions included fabricating a new skirt using the Penn State Learning Factory's laser cutter, which provided precise cuts in the nylon material. I also helped reorganize the Fusion 360 project files, streamlining them so only current versions of the design were accessible while removing outdated or obsolete parts. Beyond those specific tasks, I supported the team by taking on smaller jobs as needed to keep the project moving.",
      "The team consisted of around sixteen members, which required a significant amount of coordination and logistics to keep the work on track. While I wasn't one of the primary contributors to the early design, I played a role in the final stages leading up to the competition. In the end, our team's hovercraft performed well and Team Driftstorm won the event, which was highlighted on Penn State's LinkedIn profile.",
    ],
    outcomes: "This project gave me exposure to a collaborative engineering environment outside the classroom, where the dynamics of teamwork, iteration, and rapid problem-solving were front and center. I gained hands-on experience with fabrication tools like the laser cutter and saw firsthand how small adjustments (such as tweaking a skirt design) can make a significant impact on performance. Working with this group was truly incredible and was part of my inspiration to join leadership within ASME. Overall, the experience reinforced the importance of contributing wherever possible, even in a supporting role, and showed me how rewarding it can be to be part of a large, successful engineering team.",
    gallery: [
      "https://i.imgur.com/TEG8q4q.jpeg",
      "https://i.imgur.com/ER0IhCb.jpeg",
      "https://i.imgur.com/7jL8A6j.jpeg",
      "https://i.imgur.com/jK08w1d.jpeg",
      "https://i.imgur.com/2dUJ3GT.jpeg",
    ],
    dessertEmoji: "🍮",
    dessertName: "Lemon Custard",
  },
  {
    id: 20,
    title: "ELSA-d LEO Engineering Presentation",
    date: "Fall 2024",
    shortDescription: "Presented a professional, research-driven talk on ELSA-d satellite retrieval and the orbital debris problem.",
    image: "https://imgs.search.brave.com/XWEwsoNsTsJqDA8EL5ulT0evB4iSTLccx-GCn9W-CD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZW9wb3J0YWwub3Jn/L2FwaS9jbXMvZG9j/dW1lbnRzL2QvZW9w/b3J0YWwvZWxzYS1k/X2F1dG8yLWpwZWc",
    tech: ["Academic Research", "Public Speaking", "Professional Communication", "Technical Presentation", "Aerospace Engineering"],
    overview: "In a technical speech class at Penn State, I completed a semester-long project that culminated in a single, intensive speech of approximately twelve minutes. The project challenged me to conduct high-level engineering research and synthesize complex information into a clear and engaging presentation. The speech focused on the ELSA-d (End-of-Life Service by Astroscale Demonstration) mission and the broader challenges of space pollution, a growing concern as we approach critical limits in orbital debris.",
    mainBody: [
      "Preparing this speech was a rigorous process that demanded extensive research, careful source evaluation, and meticulous organization. I had to hunt for academic and engineering sources, ensuring that every point I made was accurate, well-supported, and relevant to the broader context of space sustainability. This required more effort than typical course projects, as I needed to translate highly technical material into language that could be understood and appreciated by a general engineering audience.",
      "The speech itself was very intense, as it required sustained focus for twelve minutes, memorizing key statistics and facts for precise, accurate delivery, and strict timing to ensure clarity and impact. I practiced repeatedly, refining my timing, pacing, and slides to maximize comprehension and engagement. The culmination of this work was my nomination as a semifinalist in the Penn State College of Engineering Speech Competition, an honor that recognized me for my hard work and natural talents speaking publicly. Though I did not advance into the next stage where I would have given my talk to hundreds of engineering students, I am very proud of myself for how far I went.",
      "I find this style of communication and presentation comes naturally, and after this project I have continued to hone my skills speaking in public and talking to larger groups of people. In the field of engineering soft skills are often harder to learn; being an engineer with high-level communication skills is a valuable skill combination I want to maintain.",
    ],
    outcomes: "This project taught me how to tackle challenging technical material and present it in a compelling way, emphasizing clarity without sacrificing depth. I gained experience in academic research, public speaking, and time management under high-pressure conditions. More broadly, I learned the value of persistence and preparation when faced with a demanding task, and I gained confidence in my ability to communicate sophisticated engineering topics to large audiences.",
    gallery: [
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    pdfUrl: "/elsa-d-presentation.pdf",
    dessertEmoji: "🍧",
    dessertName: "Lemon Sorbet",
  },
  {
    id: 15,
    title: "3D Printed Penny Boats",
    date: "Fall 2023/24",
    shortDescription: "Designed and 3D printed two competition-winning penny boats balancing buoyancy, creativity, and sustainability.",
    image: "https://i.imgur.com/tUHkEFq.jpeg",
    tech: ["SolidWorks", "3D Printing", "Sustainable Design", "Artistic Flair", "Rapid Prototyping"],
    overview: "Through Penn State's 3D Printing Club, I participated in the annual Penny Boat competition during both my freshman and sophomore years. The challenge was to design and 3D print a small boat that could hold as many pennies as possible before sinking and staying within strict competition rules. These projects gave me the chance to combine creativity, engineering problem-solving, and practical design considerations while also thinking about sustainability and long-term use.",
    mainBody: [
      "During my freshman year, I designed the Queen Bee Barge, a honeycomb-inspired boat that featured hexagonal cells resembling a beehive. This design not only gave the boat strength and structure but also required no supports during printing, making it material efficient and easier to process. The design was a success, and my boat won the competition. Afterward, I repurposed it into an organizer, with each honeycomb cell holding small bathroom and makeup items.",
      "In my sophomore year, I designed the Bathtub Boat, inspired by antique clawfoot tubs. I incorporated small sections into the design so that after the competition, the boat could continue serving as a functional organizer. This focus on reuse was intentional — I wanted my design to avoid being a single-use item, given how much plastic waste is generated by projects like these. Both boats continue to serve as everyday organizers.",
      "From a technical perspective, I considered weight distribution and buoyancy in both designs. I placed pennies evenly across the hull and used an infill pattern that maximized air pockets without sacrificing too much structural strength, allowing the boats to float effectively while still holding a significant number of pennies.",
    ],
    outcomes: "These projects taught me creative problem-solving, practical 3D printing techniques, and how to balance competition goals with sustainability and real-world use. Beyond the technical lessons, I gained an appreciation for designing with purpose: making something that not only performs well in a challenge but also has long-term utility. The Penny Boat projects showed me how engineering can be fun, resourceful, and environmentally thoughtful all at the same time.",
    gallery: [
      "https://i.imgur.com/HAgbXWK.jpeg",
      "https://i.imgur.com/JHnkAsA.jpeg",
      "https://i.imgur.com/tUHkEFq.jpeg",
      "https://i.imgur.com/flFfWhH.jpeg",
      "https://i.imgur.com/RcIZIq9.png",
    ],
    dessertEmoji: "🍩",
    dessertName: "Lemon Donut",
  },
  {
    id: 30,
    title: "Student Portfolio Upgrade",
    date: "Summer 2025",
    shortDescription: "Built a live portfolio website using TypeScript, GitHub, and AI-assisted coding — from template to deployed domain.",
    image: "https://i.imgur.com/YOzFYlx.png",
    tech: ["TypeScript", "Website Development", "Coding", "AI Integration", "bolt.new"],
    overview: "To showcase my engineering work in a professional way, I built my own portfolio website. The project began as an update to my old high school resume. My old portfolio was made in Google Sites and no longer felt representative of my skill level in college. While I had little prior web development experience, I used an AI-assisted coding platform to generate the base structure of the site, then gradually refined and expanded it. Over the course of about a month, I went from a template-driven beginner to someone much more confident navigating code, AI tools, and web publishing.",
    mainBody: [
      "The process began with the AI platform, which helped me generate the initial framework of the site. This gave me a template to build on, since I wasn't yet proficient enough in coding to design everything from scratch. On the baseline plan I had access to a very limited number of tokens, which forced me to dive into the raw code myself and save those tokens for when I was truly stuck. I migrated everything into GitHub and began manually editing and adjusting the site. This was slow and sometimes frustrating, but it gave me an accelerated learning curve by working off an existing base. I gradually became more comfortable making changes, fixing errors, and customizing the site to better fit my needs.",
      "Another important step was learning how to buy a custom domain and publish the site under it. That process gave me hands-on experience with web infrastructure and the practical side of making a site accessible to the public. To tie it all together, I also created a laser-engraved NFC business card linked directly to my website. While NFC tags are simple and easy to make, the card felt like a fun, modern touch that makes sharing my portfolio both practical and memorable.",
    ],
    outcomes: "This project taught me far more than I expected going in. On the technical side, I gained confidence working with TypeScript, GitHub, and the basics of deploying a live website. I also saw firsthand how AI can accelerate learning when used thoughtfully, but that it can't replace the need to understand and engage with the material yourself. Beyond the technical lessons, I walked away with a tangible, professional portfolio that reflects my growth as an engineer, and a set of skills that I know will be useful moving forward.",
    gallery: [
      "https://i.imgur.com/YOzFYlx.png",
      "https://i.imgur.com/t7uPOBw.png",
      "https://i.imgur.com/vCrxCPz.jpeg",
      "https://i.imgur.com/tpbEC7y.jpeg",
    ],
    pdfUrl: "https://sites.google.com/view/cboss-hs-en/home",
    dessertEmoji: "🥧",
    dessertName: "Lemon Meringue Pie",
  },
  {
    id: 5,
    title: "Gingerbread Greenhouse Dream",
    date: "Fall 2022",
    shortDescription: "Designed and built a complex edible greenhouse with sloped roofs, gelatin windows, and integrated lights.",
    image: "https://i.imgur.com/ZV8Iv8Y.jpeg",
    tech: ["Architectural Design", "Food Engineering", "Passion Project", "Project Planning"],
    overview: "For a high school creative engineering challenge, I designed and constructed a fully edible, architecturally complex gingerbread greenhouse. The structure featured sloped roofs, a small entry hall with swinging double doors, integrated lighting beneath a 'tiled' floor, and window panels made of gelatin sheets to create a realistic greenhouse effect.",
    mainBody: [
      "In my senior year of high school, I challenged myself to build an architecturally ambitious gingerbread structure. Inspired by greenhouse design, the final build featured sloped roofs, gelatin sheet windows, and a fully edible entry hall with swinging double doors.",
      "To make the project work, I relied on careful geometric planning. The intersection of angled rooflines required advanced 3D visualization and some hand-calculated trigonometry. I sketched ideas, tested with paper templates, and created a scaled cardboard mockup before baking.",
      "I installed a patterned peppermint 'tile' floor and embedded fairy lights beneath it, using frosting as grout. When lit, the floor glowed between tiles for a blinking effect. The interior was fully decorated, complete with an ice cream cone tree and small wrapped 'gifts.'",
    ],
    outcomes: "The purpose of this project was mainly fun, while I did learn some new geometry to calculate the roof shape, the overall project was mostly creative/art rather than engineering/calculation based. This project and other physical projects I have done have strengthened my spatial reasoning skills, and ultimately made me a more skilled designer when I learned CAD at a higher level. Not every project has to be extremely productive, but I am so happy I made this.",
    gallery: [
      "https://i.imgur.com/nyAAhUl.jpeg",
      "https://i.imgur.com/0j5ndnl.jpeg",
      "https://i.imgur.com/LqrKlB0.jpeg",
      "https://i.imgur.com/PmqSBN0.jpeg",
      "https://i.imgur.com/42AiL9D.jpeg",
      "https://i.imgur.com/6ANpE0C.jpeg",
    ],
    dessertEmoji: "🍪",
    dessertName: "Lemon Cookie",
  },
];

export const experienceData = [
  {
    id: 1,
    title: "Research & Development Intern",
    company: "The Applied Research Laboratory at Penn State",
    location: "State College, PA",
    duration: "October 2025 – Present",
    description: "As an R&D Engineering Intern I learned FPV drone fabrication and operation with preparation for FAA Part 107 certification, was selected as a Pipeline Student, and hold an active security clearance.",
  },
  {
    id: 2,
    title: "Mechanical Engineering Intern",
    company: "Communications & Power Industries",
    location: "State College, PA",
    duration: "Summer 2025",
    description: "Designed components for manufacturability, supported satellite systems, and integrated mechanical and electronic knowledge. My work included SolidWorks modeling and simulation, detailed documentation, and backend tasks like BOM management.",
  },
  {
    id: 3,
    title: "Student Trainee",
    company: "The Naval Undersea Warfare Center (NUWC)",
    location: "Newport, RI",
    duration: "Summer 2024",
    description: "Updated legacy designs into detailed 3D models and drawings, developed and critiqued assembly guides for technician use, and collaborated with electrical engineers to deliver cross-disciplinary solutions.",
  },
  {
    id: 4,
    title: "Drone Crew Member",
    company: "Sky Elements Drone Shows",
    location: "Dallas, TX",
    duration: "April 2021 – January 2023",
    description: "Maintained and prepared UAVs for live shows, ensured safe operation of hazardous equipment, and arranged preparatory formations — an experience that sparked my passion for drone technology.",
  },
  {
    id: 5,
    title: "Pyrotechnic Assistant",
    company: "Flambeaux Fireworks",
    location: "Texas",
    duration: "2018–2020",
    description: "Assisted in wiring and setting up professional fireworks displays using COBRA modules and e-fuses, while following fire safety protocols and hands-on training to ensure safe and successful shows.",
  },
];
