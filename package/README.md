# 🧊 Basic state & data controller

Base controller that manages state and stored data of the various modules.

To add a base controller to your module, simply extend it:

```ts
interface IMyCoolModuleState {
    loading: boolean;
}

interface IMyCoolModuleData {
    user?: string;
    password?: string;
}

class MyCoolModule extends BaseController<IMyCoolModuleState, IMyCoolModuleData> {
    constructor () {
        // Here we set default value for state and data.
        // Same value will be used when resetting 
        // state or stored data.
        super({
            loading: false
        }, {});
    }
}
```

To change state or stored data, we will use `setState` and `setData` methods:

```ts
class MyCoolModule /* ... */ {
    // ...
    
    public onUpdate () {
        // State can be changed for one element ...
        this.setData("user", "MyUserName");
        
        // ... or for several at once:
        this.setState({
            user: "MyUserName",
            password: "MyCoolPassword"
        });
    }
    
    // ...
}
```

To reset data or state of a module to its default parameters, we can
use the `resetData` and `resetState` methods:

```ts
class MyCoolModule /* ... */ {
    // ...
    
    public onReset () {
        // You can completely reset the stored data or state ...
        this.resetData(); // this.data -> {}
        
        // ... or leave certain fields:
        this.resetData("user"); // this.data -> { user: "MyUserName" }
    }
    
    // ...
}
```

You can get the current state or stored data by the variables of the same name:

```ts
this.data.user; // -> "MyUserName"

this.state.loading; // -> false
```

If you want to use only the state controller or only the data controller,
then you can simply use separate controllers from package dist:

```ts
import DataController from "@knonwout/base-module/dist/_DataController";

// or

import StateController from "@knonwout/base-module/dist/_StateController";
```

re-knownout - https://github.com/re-knownout/
<br>knownout@hotmail.com
