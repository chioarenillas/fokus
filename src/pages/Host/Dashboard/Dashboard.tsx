import "./Dashboard.css"

export default function Dashboard(): React.JSX.Element {


  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back 👋 Here’s your productivity overview.</p>
        </div>

        <button>New Task</button>
      </div>

      <div className="statsGrid">
        <div className="statCard">
          <div className="statTop">
            <div className="statInfo">
              <h3>Total Tasks</h3>
              <h2>128</h2>
            </div>

            <div className="statIcon">📋</div>
          </div>
        </div>

        <div className="statCard">
          <div className="statTop">
            <div className="statInfo">
              <h3>Completed</h3>
              <h2>94</h2>
            </div>

            <div className="statIcon">✅</div>
          </div>
        </div>

        <div className="statCard">
          <div className="statTop">
            <div className="statInfo">
              <h3>Pending</h3>
              <h2>18</h2>
            </div>

            <div className="statIcon">⏳</div>
          </div>
        </div>
      </div>

      <div className="dashboardMain">
        <div className="dashboardPanel">
          <div className="panelHeader">
            <h2>Recent Tasks</h2>
          </div>

          <div className="taskList">
            <div className="taskItem">
              <div className="taskInfo">
                <h3>Design landing page</h3>
                <p>Updated 2 hours ago</p>
              </div>

              <span className="status completed">Completed</span>
            </div>

            <div className="taskItem">
              <div className="taskInfo">
                <h3>Fix authentication bug</h3>
                <p>Updated 4 hours ago</p>
              </div>

              <span className="status progress">In Progress</span>
            </div>

            <div className="taskItem">
              <div className="taskInfo">
                <h3>Prepare presentation</h3>
                <p>Updated yesterday</p>
              </div>

              <span className="status pending">Pending</span>
            </div>
          </div>
        </div>

        <div className="sidebarSection">
          <div className="dashboardPanel">
            <div className="panelHeader">
              <h2>Quick Actions</h2>
            </div>

            <div className="quickActions">
              <button>Create Task</button>
              <button>Invite Team</button>
              <button>Reports</button>
            </div>
          </div>

          <div className="dashboardPanel">
            <div className="panelHeader">
              <h2>Weekly Progress</h2>
            </div>

            <div className="progressList">
              <div className="progressItem">
                <div className="progressTop">
                  <span>Monday</span>
                  <span>70%</span>
                </div>

                <div className="progressBar">
                  <div className="progressFill" style={{ width: "70%" }} />
                </div>
              </div>

              <div className="progressItem">
                <div className="progressTop">
                  <span>Tuesday</span>
                  <span>45%</span>
                </div>

                <div className="progressBar">
                  <div className="progressFill" style={{ width: "45%" }} />
                </div>
              </div>

              <div className="progressItem">
                <div className="progressTop">
                  <span>Wednesday</span>
                  <span>90%</span>
                </div>

                <div className="progressBar">
                  <div className="progressFill" style={{ width: "90%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
