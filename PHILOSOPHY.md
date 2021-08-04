KISS

less is more

The beauty of open source is that you can totally omit politics.
It's only one click to fork a project and then you can do with it what you want.

release early - release often

better more simple tools then one that only one that is completely bloated.
If there is a requirement then it is still easy to gather a few of them into one new module.

use the pareto principle

marketing is part of the game. The more people work on the project the better.
Teams can develop a powerful collectiv intelligence. The resulting software can be very complex.
The idea here is to concentrate on each tool on the few most important functions.
It is more efficient if you can implement 90% of the functionality of ten different tools targeting ten different problems
then if you develop in the same time one tool that covers 99% of use cases for one problem.
The result is f.in. that fejs exports only 4 functions: 

and the current docker file is somthing like:


I'd like to keep it that way(at least for some time!).
I will implement as many plugins as possible with basic functionality.
These plugins should be maintained in such a way that only bugs should the removed,
small improvements here and there and changes of the functionality should be permitted.
But not so new functionality!
For new functionality I can develop a new module that inherits the basic one.
Good functioning of the basic functionality should be priority.
Open source is about diversity so users should have the choice whether they want one simple bullet proof tool or a super hyper complex one.
