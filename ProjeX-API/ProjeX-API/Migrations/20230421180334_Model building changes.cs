using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjeX_API.Migrations
{
    /// <inheritdoc />
    public partial class Modelbuildingchanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserFriends_Users_FriendId",
                table: "UserFriends");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFriends_Users_UserId1",
                table: "UserFriends");

            migrationBuilder.DropIndex(
                name: "IX_UserFriends_UserId1",
                table: "UserFriends");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "UserFriends");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFriend_Friend_User_Id",
                table: "UserFriends",
                column: "FriendId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserFriend_Friend_User_Id",
                table: "UserFriends");

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "UserFriends",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserFriends_UserId1",
                table: "UserFriends",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFriends_Users_FriendId",
                table: "UserFriends",
                column: "FriendId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFriends_Users_UserId1",
                table: "UserFriends",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
