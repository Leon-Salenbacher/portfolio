/* slect elements */
const quote1_el = document.getElementById("quote1").querySelectorAll('h1')
const quote2_el = document.getElementById("quote2").querySelectorAll('h1, img')
const project_img = document.getElementById("project_img")
const project_name = document.getElementById("project_name")
const project_slider_items = document.querySelectorAll(".slider-item")
const project_show = document.getElementById("project-show")
const sidebar = document.getElementById("sidebar")

/* Modules */
function openURL_newTab(url){
    /* open given url in new tab */
    if(url != null){
        window.open(url, '_blank').focus();
    }
}

function get_yPOsition(){
    /* returns current y posstition of window */
    return document.documentElement.scrollTop
}

function change_state(state, el){
    /* change animation state */
    el.forEach(e => {
        e.classList.forEach(i => {
            if(i.startsWith('animation-state-')){
                e.classList.remove(i)
            }
        })
        e.classList.add('animation-state-' + state)
    });
}

function show_sidebar(set){
    sidebar.classList.forEach(c => {
        if(set){
            if(c === "sidebar-displayoff"){
                sidebar.classList.remove("sidebar-displayoff")
                sidebar.classList.add("sidebar")
            }
        }else{
            if(c === "sidebar"){
                sidebar.classList.remove("sidebar")
                sidebar.classList.add("sidebar-displayoff")
            }
        }
    })
}

/* Animation handler */
window.onscroll = () => {
    const y = get_yPOsition()

    /* show sidebar */
    if(y >= 612){
        show_sidebar(true)
    }else{
        show_sidebar(false)
    }

    /* Animate quote1 */
    if(y <= 509){
        change_state("0", quote1_el)
    }else if(y <= 611){
        change_state("20", quote1_el)
    }else if(y <= 713){
        change_state("40", quote1_el)
    }else if(y <= 815){
        change_state("60", quote1_el)
    }else if(y <= 917){ 
        change_state("80", quote1_el)
    }else if(y >= 918){
        change_state("100", quote1_el)
    }
    
    /* Animate quote2 */
    if(y < 2244){
        change_state("0", quote2_el)
    }else if(y < 2346){
        change_state("16", quote2_el)
    }else if(y < 2448){
        change_state("32", quote2_el)
    }else if(y < 2550){
        change_state("48", quote2_el)
    }else if(y < 2652){ 
        change_state("64", quote2_el)
    }else if(y < 2754){
        change_state("80", quote2_el)
    }else if(y >= 2754){
        change_state("100", quote2_el)
    }
}

/* change project */
const projects = [
    new Project(
        'Pathfinding Visualizer',
        './img/project/projects/pathfinding_visualizer.png', 
        'https://leon-salenbacher.github.io/pathfindingVisualizer/',
        0
    ),
    new Project(
        'coming soon',
        './img/project/projects/coming_soon.png',
        undefined,
        1
    ),
    new Project(
        'coming soon',
        './img/project/projects/coming_soon.png',
        undefined,
        2     
    )
]

let cur_project = 0

function change_project_to(project){
    /* Change Project */
    project_name.innerHTML = project.name
    project_img.src = project.img_path
    project_slider_items.forEach(i => {
        i.classList.forEach(c => {
            if(c === "selected"){
                i.classList.remove("selected")
            }
        })
    })  
    project_show.removeAttribute("onclick")
    project_show.onclick = () => {
        openURL_newTab(project.url)
    }
    project_slider_items[project.index].classList.add("selected")
}

function project_click(item){
    change_project_to(projects[item])   
    cur_project = item
}

function project_right(){
    if(cur_project < projects.length -1){
        cur_project++
    }else{
        cur_project = 0
    }
    change_project_to(projects[cur_project])
}

function project_left(){
    if(cur_project > 0){
        cur_project--
    }else{
        cur_project = projects.length-1
    }
    change_project_to(projects[cur_project])
}

/* Send message */
function send_message(event){
    console.log(event.searchTerm.value)
}

contactForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const l = escape("\n")
    const buildMessage = `Name: ${name_input.value} ${l}`
        + `Email: ${email.value} ${l}`
        + `Phone: ${phoneNumber.value} ${l}${l}`
        + `Message: ${l} ${message.value}`

    document.location = `mailto:leon.salenbacher.contact@gmail.com?subject=Contact Request | ${name_input.value}`
        + `&body= ${buildMessage}` 
})