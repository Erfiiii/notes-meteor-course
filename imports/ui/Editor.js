import React from "react";
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import PropType from "prop-types";

import { Notes } from "../api/notes";

export class Editor extends React.Component {
  handleTitleChange(e) {
    this.props.call("notes.update", this.props.note._id, {
      title: e.target.value
    });
  }

  handleBodyChange(e) {
    this.props.call("notes.update", this.props.note._id, {
      body: e.target.value
    });
  }

  render() {
    if (this.props.note) {
      return (
        <div>
          <input
            value={this.props.note.title}
            placeholder="Title"
            onChange={this.handleTitleChange.bind(this)}
          />
          <textarea
            value={this.props.note.body}
            placeholder="Your Note Here"
            onChange={this.handleBodyChange.bind(this)}
          />
          <button>Delete Note</button>
        </div>
      );
    } else {
      return (
        <p>
          {this.props.selectedNoteId
            ? "Note Not found"
            : "Pick or create note for start"}
        </p>
      );
    }
  }
}

Editor.propTypes = {
  selectedNoteId: PropType.string,
  note: PropType.object
};

export default createContainer(() => {
  const selectedNoteId = Session.get("selectedNoteId");

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);
