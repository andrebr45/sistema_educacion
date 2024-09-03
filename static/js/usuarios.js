var usuarios = [];
        var currentPage = 1;
        var rowsPerPage = 10;

        function carregarUsuarios() {
            fetch('/api/usuarios')
                .then(response => response.json())
                .then(data => {
                    usuarios = data;
                    mostrarUsuarios();
                })
                .catch(error => console.error('Erro ao carregar os usuários:', error));
        }

        function mostrarUsuarios() {
            var corpoTabela = document.getElementById("corpoTabela");
            var filtroOpcao = document.getElementById("filtroOpcao").value;
            var input = document.getElementById("myInput").value.toUpperCase();
            corpoTabela.innerHTML = "";

            var totalUsuarios = 0;
            var filteredUsuarios = usuarios.filter(function(usuario) {
                var incluirUsuario = false;
                if (filtroOpcao === "1") {
                    if (usuario.nome.toUpperCase().indexOf(input) > -1) {
                        incluirUsuario = true;
                    }
                } else if (filtroOpcao === "2") {
                    if (usuario.matricula.toUpperCase().indexOf(input) > -1) {
                        incluirUsuario = true;
                    }
                }
                if (incluirUsuario) totalUsuarios++;
                return incluirUsuario;
            });

            atualizarPaginacao(filteredUsuarios.length);

            var startIndex = (currentPage - 1) * rowsPerPage;
            var endIndex = startIndex + rowsPerPage;
            for (var i = startIndex; i < endIndex && i < filteredUsuarios.length; i++) {
                var usuario = filteredUsuarios[i];
                var row = document.createElement("tr");
                row.innerHTML = "<td><input type='checkbox'></td>" +
                    "<td>" + usuario.nome + "</td>" +
                    "<td>" + usuario.matricula + "</td>" +
                    "<td>" + usuario.cargo + "</td>" +
                    "<td>" + usuario.cadastro + "</td>" +
                    "<td>" + usuario.trabalho + "</td>" +
                    "<td>" + usuario.status + "</td>" +
                    "<td><span class='material-symbols-outlined'>edit</span></td>";
                corpoTabela.appendChild(row);
            }

            document.getElementById("quantidadeUsuarios").innerText = "Quantidade de Usuários: " + totalUsuarios;
        }

        function atualizarPaginacao(totalRows) {
            var paginacao = document.getElementById("paginacao");
            var totalPages = Math.ceil(totalRows / rowsPerPage);
            paginacao.innerHTML = "";
            for (var i = 1; i <= totalPages; i++) {
                var link = document.createElement("a");
                link.href = "#";
                link.innerText = i;
                if (i === currentPage) {
                    link.className = "active";
                }
                link.onclick = function() {
                    currentPage = parseInt(this.innerText);
                    mostrarUsuarios();
                };
                paginacao.appendChild(link);
            }
        }

        function filtrarTabela() {
            currentPage = 1;
            mostrarUsuarios();
        }

        carregarUsuarios();
