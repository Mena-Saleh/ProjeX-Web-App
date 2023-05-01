using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjeX_API.Migrations
{
    /// <inheritdoc />
    public partial class Contextchanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Projects_ProjectId",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_Task_Category_CategoryId",
                table: "Task");

            migrationBuilder.DropForeignKey(
                name: "FK_Task_Users_AssignedToId",
                table: "Task");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Task",
                table: "Task");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.RenameTable(
                name: "Task",
                newName: "Tasks");

            migrationBuilder.RenameTable(
                name: "Category",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_Task_CategoryId",
                table: "Tasks",
                newName: "IX_Tasks_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Task_AssignedToId",
                table: "Tasks",
                newName: "IX_Tasks_AssignedToId");

            migrationBuilder.RenameIndex(
                name: "IX_Category_ProjectId",
                table: "Categories",
                newName: "IX_Categories_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Projects_ProjectId",
                table: "Categories",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Categories_CategoryId",
                table: "Tasks",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Users_AssignedToId",
                table: "Tasks",
                column: "AssignedToId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Projects_ProjectId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Categories_CategoryId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Users_AssignedToId",
                table: "Tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "Tasks",
                newName: "Task");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "Category");

            migrationBuilder.RenameIndex(
                name: "IX_Tasks_CategoryId",
                table: "Task",
                newName: "IX_Task_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Tasks_AssignedToId",
                table: "Task",
                newName: "IX_Task_AssignedToId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_ProjectId",
                table: "Category",
                newName: "IX_Category_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Task",
                table: "Task",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Projects_ProjectId",
                table: "Category",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Task_Category_CategoryId",
                table: "Task",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Task_Users_AssignedToId",
                table: "Task",
                column: "AssignedToId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
