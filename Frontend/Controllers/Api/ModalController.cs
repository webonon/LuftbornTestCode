using System;
using DataComponent.Repositories.Interfaces;
using Frontend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Frontend.Controllers.Api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ModalController : ControllerBase
    {
        private readonly IViewRender _view;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserController> _log;

        public ModalController(ILogger<UserController> logger, IViewRender view, IUserRepository userRepository)
        {
            _log = logger ?? throw new ArgumentNullException(nameof(logger));
            _view = view ?? throw new ArgumentNullException(nameof(view));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        [HttpGet]
        public string Success()
        {
            var html = _view.Render("Modal/success", new { Title = "Success", Message = "" });
            return html;
        }

        [HttpGet]
        public string Failed()
        {
            var html = _view.Render("Modal/success", new { Title = "Success", Message = "" });
            return html;
        }

        [HttpGet]
        public string User(string id)
        {
            var user = _userRepository.GetSingleByExpression(x => x.Id == id).Result;
            return _view.Render("Modal/User", user);
        }

        [HttpGet]
        public string UserEditor(string id)
        {
            DomainModels.Models.User user;

            if (string.IsNullOrEmpty(id))
                user = new DomainModels.Models.User();
            else
                user = _userRepository.GetSingleByExpression(x => x.Id == id).Result;

            return _view.Render("Modal/UserEditor", user);
        }

        [HttpGet]
        public string Get(string viewType)
        {
            var viewPath = $"Modal/{viewType}";
            var html = _view.Render(viewPath, new { Title = "Success", Message = "" });
            return html;
        }
    }
}