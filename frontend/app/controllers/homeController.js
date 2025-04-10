angular
  .module("todoApp")
  .controller("HomeController", function ($scope, $http, $location) {
    const token = localStorage.getItem("token");
    if (!token) {
      $location.path("/login");
      return;
    }

    let isSorted = false;
    let originalTodos = [];

    function loadTodos() {
      $http
        .get("http://localhost:3000/api/todos", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          $scope.todos = res.data;
          originalTodos = [...res.data];
          $scope.filteredTodos = [...res.data];
        });
    }

    $scope.addTodo = function () {
      if (!$scope.newTodo || !$scope.newTodo.trim()) return;
      const position = $scope.todos.length;
      $http
        .post(
          "http://localhost:3000/api/todos",
          {
            task: $scope.newTodo,
            position,
          },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then(() => {
          $scope.newTodo = "";
          loadTodos();
        });
    };

    $scope.deleteTodo = function (id) {
      $http
        .delete(`http://localhost:3000/api/todos/${id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(loadTodos);
    };

    $scope.sortTodos = function () {
      if (!isSorted) {
        $scope.filteredTodos.sort((a, b) => a.task.localeCompare(b.task));
      } else {
        $scope.filteredTodos = [...originalTodos];
      }
      isSorted = !isSorted;
    };

    $scope.searchTask = function () {
      if (!$scope.searchText || !$scope.searchText.trim()) return;
      const text = $scope.searchText.toLowerCase();
      $scope.filteredTodos = $scope.todos.filter((t) =>
        t.task.toLowerCase().includes(text)
      );
    };

    $scope.clearSearch = function () {
      $scope.searchText = "";
      $scope.filteredTodos = [...$scope.todos];
    };

    $scope.onDragStart = function (event, index) {
      event.dataTransfer.setData("text/plain", index);
    };

    $scope.onDrop = function (event, index) {
      const fromIndex = event.dataTransfer.getData("text");
      const movedItem = $scope.filteredTodos.splice(fromIndex, 1)[0];
      $scope.filteredTodos.splice(index, 0, movedItem);
      $scope.todos = [...$scope.filteredTodos];
      $scope.$apply();

      $http.put(
        "http://localhost:3000/api/todos/reorder",
        {
          reorderedTodos: $scope.todos,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    };

    $scope.moveUp = function (index) {
      if (index > 0) {
        const temp = $scope.filteredTodos[index];
        $scope.filteredTodos[index] = $scope.filteredTodos[index - 1];
        $scope.filteredTodos[index - 1] = temp;
        $scope.todos = [...$scope.filteredTodos];
        $http.put(
          "http://localhost:3000/api/todos/reorder",
          {
            reorderedTodos: $scope.todos,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
      }
    };

    $scope.moveDown = function (index) {
      if (index < $scope.filteredTodos.length - 1) {
        const temp = $scope.filteredTodos[index];
        $scope.filteredTodos[index] = $scope.filteredTodos[index + 1];
        $scope.filteredTodos[index + 1] = temp;
        $scope.todos = [...$scope.filteredTodos];
        $http.put(
          "http://localhost:3000/api/todos/reorder",
          {
            reorderedTodos: $scope.todos,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
      }
    };

    $scope.logout = function () {
      localStorage.removeItem("token");
      $location.path("/login");
    };

    loadTodos();
  });
