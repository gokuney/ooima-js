const DEBUG = true;
const log = (...args) => {
    if(DEBUG)
        console.log( ...args );
}

class ooima {
    constructor(elementSelector, options) {

        
        //Create default options
        let HOTKEYS = {
            "ctrl": 17
        };
        options = options || {
            hotkey: HOTKEYS["ctrl"]
        };
        this.ooima_options = {
            listClassSelector: options.listClass || 'ooima-list-item',
            hotkey: typeof options.hotkey == 'string' ? HOTKEYS[options.hotkey] : options.hotkey,
            selectedBG: options.selectedBgColor || "#00ff00",
            animation: options.animation ? `animated ${options.animation} infinite` : '',
            listStyle: options.listStyle ? Object.keys( options.listStyle ).map( x => `${x}: ${options.listStyle[x]}` ).join(" ;")+";" : '',
        };

        //Check if required target element is defined
        if (!elementSelector) {
            throw new Error(`Missing target UL element`);
        }

        log(`Inited ooima`);
        this.appid = this.uuid();
        this.listParent = document.querySelectorAll(elementSelector);


        //ClassifyListItems
        this.$listItems = [];
        this.classifyListItems();
        
        //Bind events
        this.events();
        this.isHotkeyDown = false;
        this.freshHotKeyUp = false;
        this.mousePressedInterval;

        //Items
        this.$selectedItems = [];

    }

    uuid(){

            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });

    }


    classifyListItems() {
        log(`Running classifier`);
        let self = this;

        //iterate parent 
        self.listParent.forEach(($listParentItem) => {

            //Done button when user is in touch mode
            let touchAck = document.createElement('div');
            touchAck.innerHTML = `<button type="button" style="display:none" id="${self.appid}--done">Done</button>`;
            $listParentItem.prepend(touchAck)

            self.$listItems = $listParentItem.querySelectorAll('li');

            self.$listItems.forEach(($listItem) => {
                //add new class
                $listItem.className += self.ooima_options.listClassSelector;
                //append touch okay button
            })

        })

    }

    events() {
        log(`Initializing events`)
        let self = this;

        self.$listItems.forEach(($listItem) => {
            $listItem.addEventListener('click', function () {
                let element = this;
                self.tapEvent(element)
            })
        })

        //bind keypress event
        document.addEventListener('keydown', function (e) {
            if (e.keyCode == 17) {
                log(`Multi on`)
                self.isHotkeyDown = true;
                self.freshHotKeyUp = false;
            }
        });

        document.addEventListener('keyup', function (e) {
            if (e.keyCode == 17) {
                log(`Multi off`)
                self.isHotkeyDown = false;
                self.freshHotKeyUp = true;
            }
        });

        
        document.addEventListener('mousedown', function(){ self.pressedDown(self); });
        document.addEventListener('mouseup', function(){ self.pressedUp(self); });

        let doneBtn = document.getElementById(`${self.appid}--done`);
        doneBtn.addEventListener('click', function(){
            self.touchHighlight(false);
        });

        // document.addEventListener('touchstart', self.pressedDown);
        // document.addEventListener('touchend', self.pressedDown);

    }

    pressedDown(self){
    
        self.mousePressedInterval = setTimeout(function(){
            self.touchHighlight(true);
        }, 1000);

    }

    pressedUp(self){
        
        if(self.mousePressedInterval){
            clearTimeout(self.mousePressedInterval)
            self.mousePressedInterval = false;
        }
        
    }

    touchHighlight(active){
        log('touched ', active)
        let self = this;
        let items = self.$listItems
        log(self.$listItems)
        if(active){
            items.forEach(($item) => {
                $item.className += " is--touched";
            });

            //show done button
            let doneBtn = document.getElementById(`${self.appid}--done`);
            doneBtn.style.display = 'block';
            
            //enable multi select mode 
            self.isHotkeyDown = true;
        }else{
            items.forEach(($item) => {
                $item.className = $item.className.split(' ').filter( x => x != "is--touched").join('  ');
            });

            //hide done button
            let doneBtn = document.getElementById(`${self.appid}--done`);
            doneBtn.style.display = 'none';
            
            //disable multi select
            self.isHotkeyDown = false;
            self.freshHotKeyUp = true;

        }

    }

    tapEvent(element) {
        //add/remove item and class
        let self = this;

        let exists = self.$selectedItems.indexOf(element) > -1;

        if (exists) {

            //unselect item
            if (!self.isHotkeyDown) {
                self.unselectAll();

                if (self.freshHotKeyUp) {
                    //select this
                    self.selectItem(element)
                }

            } else {
                self.unselectItem(element);
            }
        } else {

            //unselect item
            if (!self.isHotkeyDown) {
                self.unselectAll();
            }

            //select item
            self.selectItem(element);
        }

    }

    selectItem(item) {
        let self = this;


        //add item to the list 
        self.$selectedItems.push(item);

        //add bg
        item.style.background = self.ooima_options.selectedBG;
    }

    unselectItem(item, all) {
        let self = this;

        //remove item from the list
        if (!all) {
            self.$selectedItems.splice(self.$selectedItems.indexOf(item), 1);
        }

        //remove bg
        item.style.background = "";

    }

    unselectAll() {
        let self = this;

        let items = self.$selectedItems;

        items.forEach((item) => {
            self.unselectItem(item, true);
        });

        self.$selectedItems = [];

    }

    choosenItems(doms){
        
        let self = this;
        alert(typeof doms)


        if(!doms){

            return self.$selectedItems.map(v => v.innerHTML)
        }

        if(typeof doms == "boolean"){
            //return li DOMS object
            return self.$selectedItems;
        }

        return self.$selectedItems.map( x => x.getAttribute(doms) )
        
    }




}