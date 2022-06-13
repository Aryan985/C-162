AFRAME.registerComponent('bullet',{
    init:function(){
        this.shoot()
    },
    shoot:function(){
        window.addEventListener("keydown",e=>{
            if (e.key=="s"){
                var shot = document.createElement("a-entity")
                shot.setAttribute("geometry",{primitive:"sphere",radius:0.01})
                shot.setAttribute("material",{color:"black"})
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")
                shot.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})
                var dir = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                dir.getWorldDirection(direction)
                shot.setAttribute('velocity',direction.multiplyScalar(-10))
                shot.setAttribute("dynamic-body",{mass:0})
                shot.addEventListener("collide",this.force)
                var scene=document.querySelector("#scene")
               scene.appendChild(shot)
            }
        })
    },
    force:function(e){
        //e.detail.target.el = original object(bullet)
        //e.detail.body.el = objwct which is hit(box)
        if(e.detail.body.el.id.includes("box")){
            // amount of force
            var impulse = new CANNON.Vec3(-2,1,1)
            //point of force to be applied
            var pos = new CANNON.Vec3().copy(e.detail.body.el.getAttribute("position"))
            e.detail.body.el.body.applyImpulse(impulse,pos)
            e.detail.target.el.removeEventListener("collide",this.fire)
            var scene=document.querySelector("#scene")
            scene.removeChild( e.detail.target.el)
        }
    }
})