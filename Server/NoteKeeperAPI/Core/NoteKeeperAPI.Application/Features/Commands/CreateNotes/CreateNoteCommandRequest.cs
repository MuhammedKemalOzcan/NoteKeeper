﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Features.Commands.CreateNotes
{
    public class CreateNoteCommandRequest : IRequest<CreateNoteCommandResponse>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsArchived { get; set; }

    }
}
