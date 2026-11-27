
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


const maxrenderscale=32767;
const maxsafevalue=Number.MAX_SAFE_INTEGER/(2*maxrenderscale)

function RNG(seed) {
  // LCG using GCC's constants
  this.m = 0x80000000; // 2**31;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}
RNG.prototype.nextInt = function() {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
}
RNG.prototype.nextFloat = function() {
  // returns in range [0,1]
  return this.nextInt() / (this.m - 1);
}
RNG.prototype.nextRange = function(start, end) {
  // returns in range [start, end): including start, excluding end
  // can't modulu nextInt because of weak randomness in lower bits
  var rangeSize = end - start;
  var randomUnder1 = this.nextInt() / this.m;
  return start + Math.floor(randomUnder1 * rangeSize);
}
RNG.prototype.choice = function(array) {
  return array[this.nextRange(0, array.length)];
}



    class Line{
        constructor(coef,move){
            this.coef=parseFloat(coef);
            this.move=parseFloat(move);
        }
        funct(x){
            return this.coef*x+this.move
        }
        isover(x,y){
            return ((x*this.coef+this.move)>y)
        }
        isunder(x,y){
            return ((x*this.coef+this.move)<y)
        }
        intersection(line){
            let co=(this.coef-line.coef);
            if(co){
            let x=(-this.move+line.move)/co;
            return [x,(x*this.coef+this.move)]
            }else{
                console.log("ERRROR PARALELING LINES")
            }
        }
        intersectionx(line){
            let co=(this.coef-line.coef);
            if(co){
            let x=(-this.move+line.move)/co;
            return x
            }else{
                console.log("ERRROR PARALELING LINES")
            }
        }
        intersectiony(line){
            let co=(this.coef-line.coef);
            if(co){
            let x=(-this.move+line.move)/co;
            return x*this.coef+this.move
            }else{
                console.log("ERRROR PARALELING LINES")
            }
        }
        rotated(){
            return new Line(-1/this.coef,this.move/this.coef)
        }
        reverse(){
            return new Line(-this.coef,-this.move)
        }
        strprint(){
            return `coef: ${this.coef}\nmove: ${this.move} \n`
        }
        yfilp(){
            return new Line(-this.coef,this.move)
        }
    };

    class Secarr{
        constructor(b=false){
            this.linearr=[];
            this.secup=[-maxsafevalue,10000000];
            this.b=b;
        }


        findcross(line){
            let i=0
            if(line.coef>this.linearr[i].coef){return -1}
            if(line.coef==this.linearr[i].coef && line.move<this.linearr[i].move){
                return -1
            }
            while(i<this.linearr.length && line.coef<this.linearr[i].coef){
                        if (line.intersectionx(this.linearr[i])<=this.secup[i+1]){
                            return i;
                        }
                        i++
                }
                return -2
        }


         findcrossrev(line){
            let i=this.linearr.length-1
            if(line.coef>this.linearr[i].coef){return this.linearr.length}
            if(line.coef==this.linearr[i].coef && line.move<this.linearr[i].move){
                return this.linearr.length
            }
            while(i>=0 && line.coef<this.linearr[i].coef){
                        if (line.intersectionx(this.linearr[i])<=this.secup[i+1]){
                            return i;
                        }
                        i--
                }
                return -2
        }
        
        
        findcrossalt(line){
            let i=0
            if(line.coef<this.linearr[i].coef){return -1}
            if(line.coef==this.linearr[i].coef && line.move>this.linearr[i].move){
                return -1
            }
            while(i<this.linearr.length && line.coef>this.linearr[i].coef){
                        if (line.intersectionx(this.linearr[i])>=this.secup[i]){
                            return i;
                        }
                        i++
                }
                return -2
        }


        findcrossrevalt(line){
            let i=this.linearr.length-1
            if(line.coef<this.linearr[i].coef){
                    return this.linearr.length
                }
            if(line.coef==this.linearr[i].coef && line.move>this.linearr[i].move){
                return this.linearr.length
            }
            while(i>=0 && line.coef>this.linearr[i].coef){
                        if (line.intersectionx(this.linearr[i])>=this.secup[i]){
                            return i;
                        }
                        i--
                }
                return -2
        }


        linecrossing(line){
            if(this.linearr.length==0){
                return [-1,0]
            }
            let p1
            let p2
            if(this.b){
                p1=this.findcrossalt(line)
                if(p1==-2){return [-2,-2]}
                p2=this.findcrossrev(line)
                if(p2==-2){return [-2,-2]}
            }else{
                p1=this.findcross(line)
                console.log(`1p1:${p1}`)
                if(p1==-2){return [-2,-2]}
                p2=this.findcrossrevalt(line)
                if(p2==-2){return [-2,-2]}
            }
            if(p2-p1<1){ console.log("ERROR p1-p2")}
            return [p1,p2];
            
        }
        strprint(){
            let a= `sec:${this.secup[0]}\n\n`
            for(let i=0;i<this.linearr.length;i++){
                a+=this.linearr[i].strprint();
                a+=`\nsec: ${this.secup[i+1]}\n\n`
            }
            if(this.linearr.length==0){
                a+=`sec: ${this.secup[1]}\n`
            }
            return a
        }
        cut(line){
            console.log("cut")
            if(this.linearr.length==0){
                return -maxsafevalue
            }
            console.log("cut2")
            if(line.coef<=this.linearr[0].coef){
                return -maxsafevalue
            }
            console.log("cut3")
            let index=this.findcrossalt(line)
            console.log(`index:${index}`)
            const intersect=line.intersectionx(this.linearr[index])
            console.log(`intersect:${intersect}`)
            this.secup.splice(0,index+1,intersect)
            this.linearr.splice(0,index)
            return intersect;
            
        }
        cutrev(line){
            console.log("cutrev")
            if(this.linearr.length==0){
                return maxsafevalue
            }
            console.log("cutrev2")
            if(line.coef>=this.linearr[this.linearr.length-1].coef){
                return maxsafevalue
            }
            console.log("cutrev3")
            let index=this.findcrossrev(line)
            console.log(`index:${index}`)
            const intersect=line.intersectionx(this.linearr[index])
            console.log(`intersect:${intersect}`)
            this.secup.splice(index+1,this.secup.length-index,intersect)
            this.linearr.splice(index+1,this.linearr.length-index)
            return intersect;
            
        }

        cutalt(line){
            console.log("cutalt")
            if(this.linearr.length==0){
                return -maxsafevalue
            }
            if(line.coef>=this.linearr[0].coef){
                return -maxsafevalue
            }
            console.log("cutalt3")
            let index=this.findcross(line)
            console.log(`index:${index}`)
            const intersect=line.intersectionx(this.linearr[index])
            console.log(`intersect:${intersect}`)
            this.secup.splice(0,index+1,intersect)
            this.linearr.splice(0,index)
            return intersect;
        }
        cutrevalt(line){
            console.log("cutrevalt")
            if(this.linearr.length==0){
                return maxsafevalue
            }
            console.log("cutrevalt2")
            if(line.coef<=this.linearr[this.linearr.length-1].coef){
                return maxsafevalue
            }
            console.log("cutrevalt3")
                let index=this.findcrossrevalt(line)
                console.log(`index:${index}`)
                const intersect=line.intersectionx(this.linearr[index])
                console.log(`intersect:${intersect}`)
                this.secup.splice(index+1,this.secup.length-index,intersect)
                this.linearr.splice(index+1,this.linearr.length-index)
                return intersect;
        }
    }



    class Fig{
        arrup;
        arrdown;
        intersectup;
        intersectdown;
        constructor(linearray=[]){
            this.arrup=new Secarr();
            this.arrdown=new Secarr(true);
            this.intersectup=-maxsafevalue
            this.intersectdown=maxsafevalue
            /*for(const line of linearray){
                if(line.move>0){
                    this.arrup.push(line)
                }else if(line.move<0){
                    this.arrdown.push(line)
                }else{
                    console.log("ERROR OF LINES 0")
                }
            }*/
        }

        

        spicingup(coordpair,line){
           
                if(coordpair==[-2,-2]){return}
                const p1=coordpair[0]
                const p2=coordpair[1]
                const counter=p2-p1-1;
                if(counter<0){console.log("something went very wrong in linefinder")}
                let inter1;
                let inter2;
                console.log(`p1: ${p1}`)
                if(p1!=-1){
                    console.log("normal1")
                    inter1=line.intersectionx(this.arrup.linearr[p1]);
                }else{
                    console.log("strange1")
                    inter1=this.arrdown.cut(line)
                    this.intersectup=inter1
                }
                console.log(`inter1:${inter1}`)
                if(p2!=this.arrup.linearr.length){
                    console.log("normal2")
                    inter2=line.intersectionx(this.arrup.linearr[p2]);
                }else{
                    console.log("strange2")
                    inter2=this.arrdown.cutrev(line)
                    this.intersectdown=inter2   
                }
                
                console.log(`inter2:${inter2}`)
                if(inter1!=inter2){
                     if(this.arrup.linearr!=0){
                        this.arrup.secup.splice(p1+1,counter+1,inter1,inter2)
                     }else{
                        this.arrup.secup[0]=inter1
                        this.arrup.secup[1]=inter2
                     }
                     this.arrup.linearr.splice(p1+1,counter,line)
                }
        }

        spicingdown(coordpair,line){
            if(coordpair==[-2,-2]){return}
            const p1=coordpair[0]
            const p2=coordpair[1]
            const counter=p2-p1-1;
            let inter1;
            let inter2;
            if(p1!=-1){
                inter1=line.intersectionx(this.arrdown.linearr[p1]);
            }else{
                inter1=this.arrup.cutalt(line)
                this.intersectup=inter1
            }
            if(p2!=this.arrdown.linearr.length){
                inter2=line.intersectionx(this.arrdown.linearr[p2]);
            }else{
                inter2=this.arrup.cutrevalt(line)
                this.intersectdown=inter2   
            }
            if(inter1!=inter2){
                if(this.arrdown.linearr!=0){
                    this.arrdown.secup.splice(p1+1,counter+1,inter1,inter2)
                }else{
                    this.arrdown.secup[0]=inter1
                    this.arrdown.secup[1]=inter2
                }
                this.arrdown.linearr.splice(p1+1,counter,line)
            }
        }

        addlinef(line){
            if(line.move>0){
                this.spicingup(this.arrup.linecrossing(line),line)
            }else if(line.move<0){
                this.spicingdown(this.arrdown.linecrossing(line),line)
            }else{
                console.log(`move 0 ERROR`)
            }
        }
        strprint(){
            let a="ARRUP:\n\n"
            a+=this.arrup.strprint()
            a+="\n\n ARRDOWN:\n\n"
            a+=this.arrdown.strprint()
            return a;
        }  
    };





class Canvas{
    canvas;
    fig;
    renderscale;
    offsety;
    offsetx;
    constructor(canvas,renderscale=1,fig=new Fig,offsetx=canvas.width/2,offsety=canvas.height/2){
        this.canvas=canvas
        this.renderscale=renderscale
        this.offsetx=offsetx;
        this.offsety=offsety;
        this.fig=fig
    }

drawline(line,lim1,lim2){
    const ctx = this.canvas.getContext('2d');
    const canvasy1 = -this.offsety / this.renderscale;
    const canvasy2 = (this.canvas.height - this.offsety) / this.renderscale;
    const y1 = (lim1==null?canvasy1:Math.max(canvasy1, lim1))
    const y2 =(lim2==null?canvasy2:Math.min(canvasy2, lim2))

    if (y1 > y2) return;



    const x1 =  -y1/line.coef - line.move/line.coef;
    const x2 =  -y2/line.coef - line.move/line.coef;
    //console.log(y1)
    ctx.beginPath();
    ctx.moveTo(
        this.offsetx + x1 * this.renderscale,
        this.offsety + y1 * this.renderscale
    );
    ctx.lineTo(
        this.offsetx + x2 * this.renderscale,
        this.offsety + y2 * this.renderscale
    );

    ctx.stroke();
    //console.log(1)
}

renderlines(){
  const context = this.canvas.getContext('2d');
  //console.log(this.fig.arrup.linearr)
for(let i=0;i<this.fig.arrup.linearr.length;i++){
            context.strokeStyle = "blue";
        context.lineWidth = 2;
    this.drawline(this.fig.arrup.linearr[i].rotated(),this.fig.arrup.secup[i],this.fig.arrup.secup[i+1])//
}
for(let i=0;i<this.fig.arrdown.linearr.length;i++){
            context.strokeStyle = "yellow";
        context.lineWidth = 2;
    this.drawline(this.fig.arrdown.linearr[i].rotated(),this.fig.arrdown.secup[i],this.fig.arrdown.secup[i+1])//
}
};
renderbreakpoints(){
    const context = this.canvas.getContext('2d');
    for(let br of this.fig.arrup.secup){
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.beginPath()
    context.moveTo(0,br*this.renderscale+this.offsety)
    context.lineTo(this.canvas.height,br*this.renderscale+this.offsety)
    context.stroke();
    }
    for(let br of this.fig.arrdown.secup){
    context.strokeStyle = "green";
    context.lineWidth = 1;
    context.beginPath()
    context.moveTo(0,br*this.renderscale+this.offsety)
    context.lineTo(this.canvas.height,br*this.renderscale+this.offsety)
    context.stroke();
    }
}

figtocanvasline(figlines){
    this.fig=new Fig();
    console.log(`this.fig after init(should be empty):`)
    console.log(this.fig)
    for(let line of figlines){
        this.fig.addlinef(line);
    }
    console.log(this.fig)
    this.figtocanvas()
}

figtocanvas(){
    //console.log(3)
    let step=1/this.renderscale;
    const context = this.canvas.getContext('2d');
    const imageData =context.createImageData(this.canvas.height,this.canvas.width)
    let dis2=imageData.data;
    //console.log(4)
    let ittup=0
    let ittdown=0
    let ibase=parseInt(Math.max(0,(this.fig.intersectup*this.renderscale+this.offsety)))
    let currenti=-(this.offsety-ibase)/this.renderscale
    let track=ibase*this.canvas.height*4;
    let startj
    let endj
    //console.log(currenti*this.canvas.height*4)
    //console.log(this.fig.intersectup*this.renderscale+this.offsety)
    //console.log(5)
    //console.log(ibase)
    //console.log(this.fig.intersectdown*this.renderscale+this.offsety)
    for(let i=ibase;i<Math.min(this.canvas.height,this.fig.intersectdown*this.renderscale+this.offsety);i++){
         
            while(this.fig.arrup.secup[ittup+1]<currenti){
                ittup++
            }
            while(this.fig.arrdown.secup[ittdown+1]<currenti){
                ittdown++
            }
        if(this.fig.arrup.linearr.length!=0){
            endj=Math.min(this.canvas.width,parseInt(this.fig.arrup.linearr[ittup].funct(currenti)*this.renderscale)+this.offsetx)
        }else{
            endj=this.canvas.width
        }

        if(this.fig.arrdown.linearr.length!=0){
            startj=Math.max(0,parseInt(this.fig.arrdown.linearr[ittdown].funct(currenti)*this.renderscale)+this.offsetx)
        }else{
            startj=0;
        }
        
        
        if(startj<endj){
            track+=startj*4
        for(let j=startj;j<endj;j++){
            dis2[track]=(0x00)
            track++;
            dis2[track]=(0xFF)
            track++;
            dis2[track]=(0x00)
            track++;
            dis2[track]=(0xFF)
            track++;
        }
        track+=(this.canvas.width-endj)*4;
        }else{
            track+=this.canvas.width*4;
        }
        currenti+=step;
    }
    context.putImageData(imageData, 0,0)
}
/*loop(int) {
    requestAnimationFrame(() => {
        this.renderlines(int);
        if(int<99){
            this.loop(int + 1);
        }else{
            console.timeEnd('Second');
        }
    });
}*/

}




    