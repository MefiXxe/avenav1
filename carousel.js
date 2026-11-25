/* Control de reproducción: un solo temporizador, pausas por interacción y visibilidad. */
(() => {
 class CrunchCarousel {
  constructor({count,interval=6000,enabled=false,onAdvance,clock=window}){
   this.count=count;this.interval=interval;this.playing=enabled&&count>1;this.onAdvance=onAdvance;this.clock=clock;this.reasons=new Set();this.timer=null;this.destroyed=false;
   this.restart();
  }
  restart(){if(this.timer!==null)this.clock.clearTimeout(this.timer);this.timer=null;if(this.destroyed||!this.playing||this.count<2||this.reasons.size)return;this.timer=this.clock.setTimeout(()=>{this.timer=null;this.onAdvance();this.restart();},this.interval);}
  setPlaying(value){this.playing=!!value&&this.count>1;this.restart();}
  pause(reason,value=true){if(value)this.reasons.add(reason);else this.reasons.delete(reason);this.restart();}
  destroy(){this.destroyed=true;this.restart();}
 }
 window.CrunchCarousel=CrunchCarousel;
})();
