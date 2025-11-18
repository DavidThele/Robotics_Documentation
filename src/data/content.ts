import dedent from "dedent";
// Documentation Data Structure
const abstractClassDescription = "An abstract class is a class you cannot create a traditional instance of. Instead, other classes may extend the abstract class, inherit the variables and methods contained in this class, and then add variables and methods of their own. Think of this class as incomplete; It's missing a key part of it: How to determine whether the action has completed or not. The abstract BlockingAction class cannot handle all possibilities of a completed action (waiting a certain amount of time, going to a certain position, waiting for a motor to get to a certain speed, etc.), so it is the responsibility of its subclasses to define how that action should be marked as completed.";
const runnableDescription = 'A java interface used to store code in a run() method that will be called sometime in the future.';
const adapterClassDescription = 'An adapter class is a class that implements an interface with empty methods. It is used to make it easier to create custom listeners or handlers by only overriding the methods you care about.';
const interfaceDescription = 'An interface in Java defines a set of methods that a class must implement. Interfaces do not define what these methods do, that is left up to the class. An example of an interface would be a KeyListener. A KeyListener defines several methods that a class must implement (keyPressed, keyReleased, etc.), but the class that implements KeyListener defines what happens when those methods are called.';
const listenerDescription = 'A listener is an object that waits until a certain action happens and then runs a method when it does. An example of a listener would be a KeyListener. It waits until a key is pressed, and then runs code when it is pressed.';
const actionQueueDescription = 'A data structure used to store actions waiting to be executed. Actions are processed in order of being added (unless added through insertion buffer), and act like a line of people trying to enter a building. When someone wants to enter the building, they go to the back of the line and wait their turn. Similarly, when an action needs to be run, it gets added to the back of the queue and waits until all actions ahead of it have been run in order to run.';
const insertionBufferDescription = 'A temporary set of actions added by the current action. These actions are merged into the start of the main queue once the active action finishes. Imagine a line of people trying to enter a building. The person at the front of the line gets to the doors and while entering, invites a couple of his friends to join him, letting his friends skip the line entirely. Similarly, if an action is made up of multiple subactions, the main action will get to the front of the queue, start running, and any subactions within it that get called will run immediately after the main action, skipping the queue entirely';
const functionalInterfaceDescription = 'A functional interface is an interface that contains exactly one abstract method. This one method defines what the interface does. An example would be an ActionListener. An ActionListener typically has only one method: actionPerformed(). This method will be called immediately after a given action is done: perhaps clicking a button on the screen. This method will then notify whatever implementation of the actionListener that an action was performed. Functional interfaces also enable features like lambda expressions and method references.';
const lambdaDescription = 'A lambda is a short way of writing a method without having to define a method name or class name. They are formatted as such: (parameters) -> expression. They are good for inlining things like functional interfaces such as a Runnable. An exmaple of writing one in code would be: \nRunnable runnable = () -> {\nSystem.out.println("run!");\n}';
const booleanSupplierDescription = 'A boolean supplier is a type of \'functional interface\' that will return a boolean upon invokation of the getAsBoolean() method. Since it is an interface, all implementations of it must define what boolean state to return: true or false. A key usage of a boolean supplier is that this value can change throughout time; so if you want to pass in an object that will represent one boolean value up until a certain point and then change, a boolean supplier would do that. This follows the idea of lazy evaluation.';
const lazyEvaluationDescription = 'Lazy evaluation is a programming strategy where values are not computed until they are actually needed. Instead of evaluating everything immediately, the program delays work as long as possible right up to the point where the value is needed.';
const telemetryDescription = 'Telemetry is functionally similar to a terminal one might use to debug. It acts as a way to print values to the driver station (phone) so users can see the robot status and debug.'
const motionProfileDescription = 'A motion profile defines a plan on how to get something from point A to point B. Often times, motion profiles determine the velocity of the robot by adjusting motor powers based on a joystick update. Instead of immediately setting velocity to the max, a motion profile will ramp up velocity for smoother movements, more controllability, and more grip on the floor.'

/*
 * paramters for class are:
 * id
 * name
 * type
 * classpath
 * parentClass
 * implements (array)
 * subclasses (array)
 * description
 * seeAlso (array)
 * exampleUsage
 * keyTerms (array)
  * name
  * description
 * fields (array)
  * name
  * description
  * type
* methods (array)
  * name
  * description
  * parameters (array)
    * type
    * name
    * description
  * returns
    * type
    * description
  * exampleUsage
 */
export const documentationData = [
  {
    id: 'docs-home',
    name: 'Documentation Home',
    type: 'file',
    isLanding: true,
    content: `# Welcome!
- Welcome to the documentation! Classes are organized in folders on the left panel, mirroring the codebase.
- The goal: help you understand the custom classes in the Thacher Robotics codebase so you can write your own robot code.
- For questions or contributions, contact:
- **David Thele** — dthele@thacher.org, 805-317-1896
- **Mr. Todd Meyer** — tmeyer@thacher.org
 
## IMPORTANT: Please read everything on this page before continuing with the documentation as there is neccessary information here.

# Need-to-Know Terms

## Opmode
- A runnable piece of robot code (e.g., Red Autonomous).
- Selectable and runnable from the driver station.
- Types:
  - **Teleop** — human controlled; loops continuously.
  - **Auton** — fully pre-programmed; no driver input.

## Pedro Pathing / FollowerManager
- Path-following library that allows the robot to move autonomously
- Acts as the drivetrain “brain” during autonomous.

## BlockingAction Framework
- System for sequencing behaviors (move, wait, turn, score…) to perform one after another
- **BlockingAction** — prevents other actions from running until finished.

## Pose
- Robot’s position and orientation: (x, y, heading).

# General Structure

## Opmode Layer
- Execution entry point.
- **Teleop**
  - Read driver inputs → send subsystem commands.
  - Loop continuously.
- **Autonomous OpModes**
  - Build an action sequence.
  - Use path follower for movement.
  - Use subsystems to score/pick/place.
  - Block or continue using the action sequences.

## Subsystem Layer
- Hardware modules:
  - Drivetrain
  - Lift
  - Intake
  - Arm
  - Sensors (IMU, cameras, etc.)
- Each subsystem includes:
  - Hardware initialization
  - Control logic (PID, motion planning, presets)
  - loop() method per cycle

## Math Layer
- MotionProfile helpers
- PID(F) controllers
- Pose estimation tools
- (Used by subsystems; not subsystems themselves)

# Autonomous Action Framework
- Autonomous runs a list of actions sequentially.
- Each action flows through logic → math → hardware.
- Sends commands to motors, servos, sensors.
- Creates a clean autonomous pipeline.

# Runtime Flow

    `
  },
  {
    id: 'blocking-folder',
    name: 'Blocking',
    type: 'folder',
    children: [
      /**************  BlockingAction  *************/
      {
        id: 'BlockingAction',
        name: 'BlockingAction',
        type: 'file',
        classpath: 'org.firstinspires.ftc.teamcode.robotCode.Blocking.BlockingAction',
        subclasses: ['ConditionalBlockingAction', 'PathBlockingAction', 'TemporalBlockingAction'],
        description: `An abstract class for actions that stop other actions in a sequence 
                      from running until it is completed. A BlockingAction can run code 
                      (represented as a Runnable object) and will report when it's finished 
                      via the isFinished() method. It will also notify any BlockingActionListeners 
                      upon start or completion. Used by BlockingActionManager to ensure only 
                      one of these runs at a time.`,
        seeAlso: ['BlockingActionListener', 'BlockingActionManager'],
        keyTerms: [
          {
            name: 'Abstract Class',
            description: abstractClassDescription
          },
          {
            name: 'Runnable',
            description: runnableDescription
          },
        ],
        fields: [
          {
            name: 'Action',
            description: 'Code to run when the action starts.',
            type: 'Runnable',
          },
          {
            name: 'Listeners',
            description: 'Listeners that get notified when the action starts and finishes.',
            type: 'ArrayList<BlockingActionListener>',
          },
        ],
        methods: [
          {
            name: 'isFinished',
            description: "Determines whether the action is considered completed or not. Must be implemented by subclasses to tell when the action is done.",
            returns: {
              type: 'boolean',
              description: 'Whether or not the action has finished or not.'
            },
            exampleUsage:
              dedent`if (action.isFinished()) {
              runNextAction();
            }`
          },
          {
            name: 'loop',
            description: "A method that should be called repeatedly from when the action should be started until when the action ends. It will take care of all logic for starting the action, stopping the action, and notifying listeners upon start or stop",
            exampleUsage:
              dedent`public class ExampleOpMode extends OpMode {
              @Override
              public void loop() {
                action.loop();
              }
            }`
          },

          {
            name: 'setAction',
            description: 'Sets the action to be run by replacing the Runnable object',
            parameters: [
              {
                type: 'Runnable',
                name: 'action',
                description: 'The action to run.'
              }
            ],
            exampleUsage:
              dedent`action.setAction(() -> actionRun = true);`
          },
        ],
      },
      /**************  BlockingActionListener *************/
      {
        id: 'BlockingActionListener',
        name: 'BlockingActionListener',
        type: 'file',
        classpath: 'org.firstinspires.ftc.teamcode.robotCode.Blocking.BlockingActionListener',
        subclasses: ['BlockingActionAdapter'],
        description: 'An interface for receiving notifications from a BlockingAction. Implement this interface to run code when a BlockingAction starts or finishes.',
        seeAlso: ['BlockingAction', 'BlockingActionAdapter'],
        exampleUsage: dedent`action.addBlockingActionListener(new BlockingActionListener() {
          @Override
          public void actionStarted() {
            actionStarted = true;
          }

          @Override
          public void actionFinished() {
            actionFinished = true;
          }
        })`,
        keyTerms: [
          {
            name: 'Interface',
            description: interfaceDescription
          },
          {
            name: 'Listener',
            description: listenerDescription
          }
        ],
        methods: [
          {
            name: 'actionStarted',
            description: 'Called when a BlockingAction begins running. Implement this method to define behavior when the action starts.',
            exampleUsage: dedent`public class MyListener implements BlockingActionListener {
              @Override
              public void actionStarted() {
                actionStarted = true;
              }

              @Override
              public void actionFinished() {
                actionFinished = true;
              }
            }`
          },
          {
            name: 'actionFinished',
            description: 'Called when a BlockingAction completes. Implement this method to define behavior when the action finishes.',
            exampleUsage: dedent`public class MyListener implements BlockingActionListener {
              @Override
              public void actionStarted() {
                actionStarted = true;
              }

              @Override
              public void actionFinished() {
                actionFinished = true;
              }
            }`
          }
        ]
      },
      /**************  BlockingActionAdapter  *************/
      {
        id: 'BlockingActionAdapter',
        name: 'BlockingActionAdapter',
        type: 'file',
        classpath: 'org.firstinspires.ftc.teamcode.robotCode.Blocking.BlockingActionAdapter',
        implements: ['BlockingActionListener'],
        description: 'A convenience class that implements the BlockingActionListener interface with empty methods. You can extend this class and override only the methods you need, instead of implementing all methods of the interface.',

        seeAlso: ['BlockingActionListener', 'BlockingAction'],
        exampleUsage: dedent`action.addActionListener(new BlockingActionAdapter() {
          //only implementing one of the methods from BlockingActionListener interface
          @Override
          public void actionStarted() {
            actionStarted = true;
          }
        });`,
        keyTerms: [
          {
            name: 'Adapter Class',
            description: adapterClassDescription
          },
          {
            name: 'Interface',
            description: interfaceDescription
          },
          {
            name: 'Listener',
            description: listenerDescription
          }
        ],
        methods: [
          {
            name: 'actionStarted',
            description: 'Called when a BlockingAction begins running. This adapter provides an empty implementation, so it does nothing by default.',
            exampleUsage: dedent`public class MyAdapter extends BlockingActionAdapter {
                  @Override
                  public void actionStarted() {
                    actionStarted = true;
                  }
              }`
          },
          {
            name: 'actionFinished',
            description: 'Called when a BlockingAction completes. This adapter provides an empty implementation, so it does nothing by default.',
            exampleUsage: dedent`public class MyAdapter extends BlockingActionAdapter {
                  @Override
                  public void actionFinished() {
                    actionStarted = true;
                  }
              }`
          }
        ]
      },
      /**************  BlockingActionManager  *************/
      {
        id: 'BlockingActionManager',
        name: 'BlockingActionManager',
        type: 'file',
        classpath: 'org.firstinspires.ftc.teamcode.robotCode.Blocking.BlockingActionManager',
        description: 'Manages a queue of BlockingActions, ensuring that only one action runs at a time and that subsequent actions wait until the current action finishes. Allows actions to contains subactions which, when added, will run immediately after the first action',
        seeAlso: ['BlockingAction', 'BlockingActionListener'],
        exampleUsage: dedent`public void init() {
          BlockingActionManager actionManager = new BlockingActionManager();
          actionManager.submit(action1);
          actionManager.submit(action2);
        }
        public void loop() {
          actionManager.loop();
        }`,
        keyTerms: [
          {
            name: 'Action Queue',
            description: actionQueueDescription
          },
          {
            name: 'Insertion Buffer',
            description: insertionBufferDescription
          },
        ],
        fields: [
          {
            name: 'actionQueue',
            description: 'The main queue of actions waiting to be executed.',
            type: 'Deque<BlockingAction>'
          },
          {
            name: 'insertionBuffer',
            description: 'A list of actions added during the execution of the current action to be executed immediately after it finishes.',
            type: 'Stack<BlockingAction>'
          },
          {
            name: 'activeAction',
            description: 'The BlockingAction currently running.',
            type: 'BlockingAction'
          },
          {
            name: 'isBuffering',
            description: 'Indicates whether actions should be added to the insertion buffer or the main queue.',
            type: 'boolean'
          }
        ],
        methods: [
          {
            name: 'submit',
            description: 'Adds a BlockingAction to be executed. This blocking action will be placed at the end of the queue unless added from another running action, at which point it will be placed in the insertion buffer.',
            parameters: [
              {
                type: 'BlockingAction',
                name: 'action',
                description: 'The action to be queued for execution.'
              }
            ],
            exampleUsage: dedent`manager.submit(new TemporalBlockingAction("Temporal Action 1", 1000, () -> actionRunning = true));`
          },
          {
            name: 'loop',
            description: 'Should be called repeatedly to process actions. Checks if the current action has finished, fetches the next action from the queue if available, and runs the active action.',
            exampleUsage: dedent`public class ExampleOpMode extends OpMode {
                @Override
                public void loop() {
                  manager.loop();
                }
              }`
          },
          {
            name: 'clear',
            description: 'Clears all queued and buffered actions.',
            exampleUsage: dedent`manager.clear();`
          },
          {
            name: 'getCurrentAction',
            description: 'Returns the currently active action.',
            returns: {
              type: 'BlockingAction',
              description: 'The BlockingAction that is currently running.'
            },
            exampleUsage: dedent`BlockingAction current = manager.getCurrentAction();`
          },
          {
            name: 'isBusy',
            description: 'Indicates whether the manager has any actions still running or queued.',
            returns: {
              type: 'boolean',
              description: 'True if there is an active action or queued/buffered actions, false if everything is finished.'
            },
            exampleUsage: dedent`if (!manager.isBusy()) {
              robotAtRest = true;    
            }`
          },
          {
            name: 'updateTelemetry',
            description: 'Outputs information about the queue and its actions to the provided Telemetry object',
            parameters: [
              {
                type: 'Telemetry',
                name: 'telemetry',
                description: 'The telemetry object to report the queue status and action names.'
              }
            ],
            exampleUsage: dedent`manager.updateTelemetry(telemetry);`
          }
        ]
      },
      /**************  ConditionalBlockingAction  *************/
      {
        id: 'ConditionalBlockingAction',
        name: 'ConditionalBlockingAction',
        type: 'file',
        classpath: 'org.firstinspires.ftc.teamcode.robotCode.Blocking.ConditionalBlockingAction',
        description: 'An implementation of the abstract BlockingAction class that will run an action or \'block\', until a condition given as a BooleanSupplier',
        parentClass: 'BlockingAction',
        exampleUsage: '//blocks until a motor has gotten up to speed\nBlockingAction action = new ConditionalBlockingAction("Wait for Motor", () -> !motor.isBusy());',
        keyTerms: [
          {
            name: 'Interface',
            description: interfaceDescription
          },
          {
            name: 'Functional Interface',
            description: functionalInterfaceDescription
          },
          {
            name: 'Lambda',
            description: lambdaDescription
          },
          {
            name: 'Boolean Supplier',
            description: booleanSupplierDescription
          },
          {
            name: 'Lazy Evaluation',
            description: lazyEvaluationDescription
          }
        ],
        constructors: [
          {
            name: 'ConditionalBlockingAction(String name, BooleanSupplier condition, Runnable action)',
            description: 'Is used for defining a blocking action with both an action to run, and a condition to mark completion.',
            parameters: [
              {
                type: 'String',
                name: 'name',
                description: 'The name of the action used for telemetry purposes.'
              },
              {
                type: 'BooleanSupplier',
                name: 'condition',
                description: 'The condition that determines whether the action has completed or not. True -> finished, False -> still running.'
              },
              {
                type: 'Runnable',
                name: 'action',
                description: 'The action to run.'
              },
            ]
          },
          {
            name: 'ConditionalBlockingAction(String name, BooleanSupplier condition)',
            description: 'Is used for defining a blocking action that blocks until a condition is true. No action is run during this time, it is merely waiting until a condition is met.',
            parameters: [
              {
                type: 'String',
                name: 'name',
                description: 'The name of the action used for telemetry purposes.'
              },
              {
                type: 'BooleanSupplier',
                name: 'condition',
                description: 'The condition that determines whether the action has completed or not. True -> finished, False -> still running.'
              },
            ]
          },
          {
            name: 'ConditionalBlockingAction(String name)',
            description: 'Defines a default BlockingAction that runs no action and blocks for no time. This class will always return that it has finished running.',
            parameters: [
              {
                type: 'String',
                name: 'name',
                description: 'The name of the action used for telemetry purposes.'
              },
            ]
          },
        ],
        fields: [
          {
            name: 'condition',
            description: 'The condition to determine whether the action has completed or not.',
            type: 'BooleanSupplier'
          }
        ],
        methods: [
          {
            name: 'isFinished',
            description: 'Determines whether or not the action has terminated based on the condition defined in the constructor.',
            returns: {
              type: 'boolean',
              description: 'Returns the state of the action, whether it\'s running or if it\'s finished.'
            }

          }
        ],
      },
      /**************  PathBlockingAction  *************/
      {
        id: 'PathBlockingAction',
        name: 'PathBlockingAction',
        type: 'file',
        classpath: 'org.firstinspires.ftc.teamcode.robotCode.Blocking.PathBlockingAction',
        description: 'An implementation of the abstract BlockingAction class that will move the robot to a given position and be marked as completed when the robot has reached that position.',
        parentClass: 'BlockingAction',
        exampleUsage: dedent`PathBlockingAction action = new PathBlockingAction("go to center", robot.getFollower(), robot.pathBuilder()
          .addPath(
            new BezierLine(robot::getPose, new Pose(72,72))
          )
          .build();
        );`,
        constructors: [
          {
            name: 'PathBlockingAction(String name, Follower follower, PathChain path)',
            description: 'Creates an action to follow a given path and block until arrival.',
            parameters: [
              {
                type: 'String',
                name: 'name',
                description: 'The name of the action used for telemetry purposes.'
              },
              {
                type: 'Follower',
                name: 'follower',
                description: 'A follower object used to control the robot for autonomous movement. Typically retrieved via robot.getFollower().'
              },
              {
                type: 'PathChain',
                name: 'path',
                description: 'The path to follow.'
              },
            ]
          }
        ],
        methods: [
          {
            name: 'isFinished',
            description: 'Determines whether or not the robot has completed its desired path.',
            returns: {
              type: 'boolean',
              description: 'Returns whether or not the robot has arrived at its final position in the path.'
            }
          }
        ],
      },
      /**************  TemporalBlockingAction  *************/
      {
        id: 'TemporalBlockingAction',
        name: 'TemporalBlockingAction',
        type: 'file',
        classpath: 'org.firstinspires.ftc.teamcode.robotCode.Blocking.TemporalBlockingAction',
        description: 'An implementation of the abstract BlockingAction class that will run an action and block for a certain amount of time. ',
        parentClass: 'BlockingAction',
        exampleUsage: 'TemporalBlockingAction action = new TemporalBlockingAction("Move Servo", 400, () -> servo.setPosition(0.8));',
        constructors: [
          {
            name: 'TemporalBlockingAction(String name, int millisRequested, Runnable action)',
            description: 'Creates an action to run for a given number of milliseconds.',
            parameters: [
              {
                type: 'String',
                name: 'name',
                description: 'The name of the action used for telemetry purposes.'
              },
              {
                type: 'int',
                name: 'millisRequested',
                description: 'The number of milliseconds this action should block for.'
              },
              {
                type: 'Runnable',
                name: 'action',
                description: 'The action to be run'
              },
            ]
          },
          {
            name: 'TemporalBlockingAction(String name, Runnable action)',
            description: 'Creates an action to run that is an instantaneous action.',
            parameters: [
              {
                type: 'String',
                name: 'name',
                description: 'The name of the action used for telemetry purposes.'
              },
              {
                type: 'Runnable',
                name: 'action',
                description: 'The action to be run'
              },
            ]
          },
          {
            name: 'TemporalBlockingAction(String name, int millisRequested)',
            description: 'Waits for a certain amount of time.',
            parameters: [
              {
                type: 'String',
                name: 'name',
                description: 'The name of the action used for telemetry purposes.'
              },
              {
                type: 'int',
                name: 'millisRequested',
                description: 'The amount of time to wait for'
              },
            ]
          },
        ],
        methods: [
          {
            name: 'isFinished',
            description: 'Determines whether or not the specified time has elaped',
            returns: {
              type: 'boolean',
              description: 'Whether or not the action has been running for a given amount of time.'
            }
          }
        ],
      },
    ],
  },
  {
    id: 'opmodes-folder',
    name: 'OpModes',
    type: 'folder',
    children: [
      /**************  SmartOpMode  *************/
      {
        id: 'SmartOpMode',
        name: 'SmartOpMode',
        type: 'file',
        classpath: 'org.firstinspires.ftc.teamcode.robotCode.OpModes.SmartOpMode',
        description: 'A base OpMode class that creates and manages the Robot instance and manages telemetry. All opmode classes should extend this in some way, typically by extending one of the two Auton or Teleop classes that extend this class.',
        subclasses: ['Auton','Teleop'],
        keyTerms: [
          {
            name: 'Abstract Class',
            description: abstractClassDescription
          },
          {
            name: 'Telemetry',
            description: telemetryDescription
          }
        ],
        fields: [
              {
                name: 'robot',
                description: 'The instance of a robot object to be used to drive around, do actions, and complete all the functionality one might want with their robot',
                type: 'Robot'
              }
            ],
        methods: [
          {
            name: 'init',
            description: 'Called once when the init button is pressed on the driver station (phone). Initializes robot instance with all hardware and robot components and clears any remaining actions in the action queue. Can be overriden so long as super.init() is called.',
          },
          {
            name: 'init_loop',
            description: 'Called repeatedly while the robot is in the init period. Displays available robot telemetry.',
          },
          {
            name: 'start',
            description: 'Called once when the start button is pressed on the driver station (phone). Initializes robot following PIDs',
          },
          {
            name: 'loop',
            description: 'Called repeatedly while the opmode is running. Defines the main game loop, and is functionally equivelent to a game loop you might see in a comp sci assignment like pong.',
          },
          {
            name: 'updateTelemetry',
            description: 'Collects telemetry from different robot components and posts it to the phone.',
          },
          {
            name: 'stop',
            description: 'An empty method provided for optional overriding. Gets called when the opmode is stopped, either forcefully by pressing the button or when the 30s auton period elapses. Be careful when using this method; Do not define more actions for the robot to do, this method should only be used for cleanup, as hardware access will be limited.',
          },
          {
            name: 'getStartPose',
            description: 'An abstract method for subclasses to implement that determines the starting pose of the robot. If the subclass is one of the Auton class, then the start pose will be used every time the code is run. If the subclass is one of the Teleop class, then the startpose will only be used if no other startpose is available.',
            returns: {
              type: 'Pose',
              description: 'The start pose of the robot in pedro coordinates.'
            }
          },
        ],
      },
      {
        id: 'auton-folder',
        name: 'Auton',
        type: 'folder',
        children: [
          /**************  ActionSequence  *************/
          {
            id: 'ActionSequence',
            name: 'ActionSequence',
            type: 'file',
            classpath: 'org.firstinspires.ftc.teamcode.robotCode.OpModes.Auton.ActionSequence',
            description: 'A class that holds a list of BlockingActions and provides easy dynamic building of a sequence of actions. Also provides a helper method for submitting all actions to the robot to be run.',
            seeAlso: ['Auton', 'BlockingAction'],
            exampleUsage: dedent`new ActionSequence(robot)
              .add(robot.actions().enableIntake())
              .path("Go To Center" paths.GoToCenter)
              .sleep(1000)
            .runActions();
            `,
            methods: [
              {
                name: 'add',
                description: 'Appends a BlockingAction to the list',
                parameters: [
                  {
                    type: 'BlockingAction',
                    name: 'action',
                    description: 'The action to add to the sequence.'
                  }
                ]
              },
              {
                name: 'sleep',
                description: 'Appends a wait action to the list',
                parameters: [
                  {
                    type: 'int',
                    name: 'millis',
                    description: 'The the number of milliseconds to sleep for.'
                  }
                ]
              },
              {
                name: 'path',
                description: 'Appends a pathing action to the list',
                parameters: [
                  {
                    type: 'String',
                    name: 'name',
                    description: 'The name of the path. Used for telemetry purposes.'
                  },
                  {
                    type: 'PathChain',
                    name: 'path',
                    description: 'The path to add to the sequence.'
                  }
                ]
              },
              {
                name: 'runActions',
                description: 'Submits all actions to the robot to run in sequence at the next available time.',
              },
            ],
          },
          /**************  Auton  *************/
          {
            id: 'Auton',
            name: 'Auton',
            type: 'file',
            classpath: 'org.firstinspires.ftc.teamcode.robotCode.OpModes.Auton.Auton',
            description: 'An abstract base class for autonomous opmodes. Enforces the implementation of a createActionSequence() method to define what the robot should do during the autonomous. This method, along with the getStartPose() method defined in the SmartOpMode class, are the only two methods needed to write an auton.',
            parentClass: 'SmartOpMode',
            subclasses: ['RedAutonCloseStart', 'BlueAutonCloseStart', 'RedAutonFarStart', 'BlueAutonFarStart'],
            keyTerms: [
              {
                name: 'Abstract Class',
                description: abstractClassDescription
              }
            ],
            seeAlso: ['ActionSequence'],
            exampleUsage: dedent`public class ExampleAuton {
              private Robot robot;

              @Override
              public void init() {
                robot = new Robot(hardwareMap);
              }

              @Override
              public void loop() {
                robot.loop();
              }
            }
            `,
            fields: [
              {
                name: 'actionSequence',
                description: 'The sequence of actions to run during the autonomous period of the match',
                type: 'ActionSequence'
              },
            ],
            methods: [
              {
                name: 'createActionSequence',
                description: 'A method for implementations of this class to define. This method creates the ActionSequence that the robot will follow during the autonomous period.',
                returns: {
                  type: 'ActionSequence',
                  description: 'The action sequence to run during the autonomous period of the match.'
                }
              },
              {
                name: 'init',
                description: 'Initializes hardware components, variables, and the ActionSequence defined in the createActionSequence() method to follow autonomously.'
              },
              {
                name: 'start',
                description: 'Called when the start button on the driver station (phone) is pressed and begins the action sequence.'
              }
            ],
          },
          {
            id: 'blue-folder',
            name: 'Blue',
            type: 'folder',
            children: [
              /**************  BlueAutonCloseStart  *************/
              {
                id: 'BlueAutonCloseStart',
                name: 'BlueAutonCloseStart',
                type: 'file',
                classpath: 'org.firstinspires.ftc.teamcode.robotCode.OpModes.Blue.BlueAutonCloseStart',
                description: 'The auton opmode for a close start (touching goal) on the Blue alliance.',
                parentClass: 'Auton',
                seeAlso: ['RedAutonCloseStart', 'RedAutonFarStart', 'BlueAutonFarStart'],
                methods: [
                  {
                    name: 'createActionSequence',
                    description: 'Defines the action sequence for the robot to follow during the autonomous period of the match on Blue team.',
                    returns: {
                      type: 'ActionSequence',
                      description: 'The action sequence to run during the autonomous period of the match.'
                    }
                  },
                  {
                    name: 'getStartPose',
                    description: 'Defines the start pose for the robot so it knows where it is.',
                    returns: {
                      type: 'Pose',
                      description: 'The start pose of the robot in pedro coordinates.'
                    }
                  }
                ],
              },
              /**************  BlueAutonFarStart  *************/
              {
                id: 'BlueAutonFarStart',
                name: 'BlueAutonFarStart',
                type: 'file',
                classpath: 'org.firstinspires.ftc.teamcode.robotCode.OpModes.Blue.BlueAutonFarStart',
                description: 'The auton opmode for a Far start (touching goal) on the Blue alliance.',
                parentClass: 'Auton',
                seeAlso: ['RedAutonCloseStart', 'RedAutonFarStart', 'BlueAutonCloseStart'],
                methods: [
                  {
                    name: 'createActionSequence',
                    description: 'Defines the action sequence for the robot to follow during the autonomous period of the match on Blue team.',
                    returns: {
                      type: 'ActionSequence',
                      description: 'The action sequence to run during the autonomous period of the match.'
                    }
                  },
                  {
                    name: 'getStartPose',
                    description: 'Defines the start pose for the robot so it knows where it is.',
                    returns: {
                      type: 'Pose',
                      description: 'The start pose of the robot in pedro coordinates.'
                    }
                  }
                ],
              },
            ],
          },
          {
            id: 'red-folder',
            name: 'Red',
            type: 'folder',
            children: [
              /**************  RedAutonCloseStart  *************/
              {
                id: 'RedAutonCloseStart',
                name: 'RedAutonCloseStart',
                type: 'file',
                classpath: 'org.firstinspires.ftc.teamcode.robotCode.OpModes.Red.RedAutonCloseStart',
                description: 'The auton opmode for a close start (touching goal) on the Red alliance.',
                parentClass: 'Auton',
                seeAlso: ['BlueAutonCloseStart', 'RedAutonFarStart', 'RedAutonFarStart'],
                methods: [
                  {
                    name: 'createActionSequence',
                    description: 'Defines the action sequence for the robot to follow during the autonomous period of the match on Red team.',
                    returns: {
                      type: 'ActionSequence',
                      description: 'The action sequence to run during the autonomous period of the match.'
                    }
                  },
                  {
                    name: 'getStartPose',
                    description: 'Defines the start pose for the robot so it knows where it is.',
                    returns: {
                      type: 'Pose',
                      description: 'The start pose of the robot in pedro coordinates.'
                    }
                  }
                ],
              },
              /**************  RedAutonFarStart  *************/
              {
                id: 'RedAutonFarStart',
                name: 'RedAutonFarStart',
                type: 'file',
                classpath: 'org.firstinspires.ftc.teamcode.robotCode.OpModes.Red.RedAutonFarStart',
                description: 'The auton opmode for a Far start (touching goal) on the Red alliance.',
                parentClass: 'Auton',
                seeAlso: ['RedAutonCloseStart', 'BlueAutonFarStart', 'BlueAutonCloseStart'],
                methods: [
                  {
                    name: 'createActionSequence',
                    description: 'Defines the action sequence for the robot to follow during the autonomous period of the match on Red team.',
                    returns: {
                      type: 'ActionSequence',
                      description: 'The action sequence to run during the autonomous period of the match.'
                    }
                  },
                  {
                    name: 'getStartPose',
                    description: 'Defines the start pose for the robot so it knows where it is.',
                    returns: {
                      type: 'Pose',
                      description: 'The start pose of the robot in pedro coordinates.'
                    }
                  }
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'teleop-folder',
        name: 'Teleop',
        type: 'folder',
        children: [
          /**************  Teleop  *************/
          {
            id: 'Teleop',
            name: 'Teleop',
            type: 'file',
            classpath: 'org.firstinspires.ftc.teamcode.robotCode.OpModes.Teleop',
            description: '',
            parentClass: 'SmartOpMode',
            subclasses: ['RedTeleop', 'BlueTeleop'],
            fields: [
              {
                type: 'List<Binding>',
                name: 'bindings',
                description: 'All keybinds mapped to actions to do.'
              },
              {
                type: 'MotionProfile',
                name: 'xMotionProfile',
                description: 'The motion profile that ramps speeds in the x direction (lateral movement).'
              },
              {
                type: 'MotionProfile',
                name: 'yMotionProfile',
                description: 'The motion profile that ramps speeds in the y direction (forward/backward movement).'
              },
              {
                type: 'MotionProfile',
                name: 'rotMotionProfile',
                description: 'The motion profile that ramps rotational speed.'
              },
            ],
            keyTerms: [
              {
                name: 'Motion Profile',
                description: motionProfileDescription
              }
            ],
            methods: [
              {
                name: 'init',
                description: 'Initializes the starting pose by retrieving it from a previous auton, or, if no previous auton was played, from the getStartPoseMethod()',
              },
              {
                name: 'gamepad1',
                returns: {
                  type: 'Gamepad',
                  description: 'The gamepad1 determined by the gamepad indicator in the upper right corner of the driver station (phone).'
                }
              },
              {
                name: 'gamepad2',
                returns: {
                  type: 'Gamepad',
                  description: 'The gamepad2 determined by the gamepad indicator in the upper right corner of the driver station (phone).'
                }
              },
              {
                name: 'initiateButtonMap',
                description: 'Initiates all team-neutral keybinds excluding movements.'
              },
              {
                name: 'loop',
                description: 'Updates motion profiles, keybinds, and moves the robot.'
              },
            ],
          },
          {
            id: 'blue-teleop-folder',
            name: 'Blue',
            type: 'folder',
            children: [
              /**************  BlueTeleop  *************/
              {
                id: 'BlueTeleop',
                name: 'BlueTeleop',
                type: 'file',
                classpath: 'org.firstinspires.ftc.teamcode.robotCode.OpModes.Blue.BlueTeleop',
                description: 'The teleop opmode that defines Blue team specific actions like movement actions to Blue-team specific locations.',
                parentClass: 'Teleop',
                seeAlso: ['RedTeleop'],
                methods: [
                  {
                    name: 'init',
                    description: 'Initializes anything specific to the Blue alliance code, like movement actions to Blue-team specific locations',
                  },
                  {
                    name: 'initiateButtonMap',
                    description: 'Adds Blue-team specific keybinds.',
                  },
                ],
              },
            ],
          },
          {
            id: 'red-teleop-folder',
            name: 'Red',
            type: 'folder',
            children: [
              /**************  RedTeleop  *************/
              {
                id: 'RedTeleop',
                name: 'RedTeleop',
                type: 'file',
                classpath: 'org.firstinspires.ftc.teamcode.robotCode.OpModes.Red.RedTeleop',
                description: 'The teleop opmode that defines Red team specific actions like movement actions to Red-team specific locations.',
                parentClass: 'Teleop',
                seeAlso: ['BlueTeleop'],
                methods: [
                  {
                    name: 'init',
                    description: 'Initializes anything specific to the Red alliance code, like movement actions to Red-team specific locations',
                  },
                  {
                    name: 'initiateButtonMap',
                    description: 'Adds Red-team specific keybinds.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'robot-components-folder',
    name: 'RobotComponents',
    type: 'folder',
    children: [
      {
        name: 'Page Does Not Exist: To Be Implemented...'
      }
    ],
  },
];

// Homework Data Structure
export const homeworkData = [
  {
    id: 'hw-home',
    name: 'Homework Assignments',
    type: 'file',
    isLanding: true,
    content: 'Welcome to the homework assignments section! Here you will find practice assignments to help you learn the codebase. Each assignment includes learning objectives, tasks, hints, and references to related documentation.',
  },
  {
    id: 'hw-1',
    name: 'Assignment 1: Data Loading',
    type: 'file',
    difficulty: 'Easy',
    description: 'Learn how to use the DataManager class to load and save data from files. This assignment will help you understand the basics of file I/O operations.',
    objectives: [
      'Understand the DataManager API',
      'Load data from a JSON file',
      'Save modified data back to a file',
    ],
    docReferences: [
      {
        title: 'DataManager Documentation',
        docId: 'data-manager',
      },
    ],
    tasks: [
      'Create a new DataManager instance',
      'Load the provided "students.json" file using loadData()',
      'Add a new student object to the loaded data',
      'Save the modified data to "updated_students.json"',
      'Verify the file was created correctly',
    ],
    hints: [
      'Remember to check if the file exists before loading',
      'The data structure is an array of student objects',
    ],
  },
];
