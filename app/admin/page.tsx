'use client';

import { useState } from 'react';
import Footer from '../components/Footer';

interface Drop {
  id: string;
  title: string;
  date: string;
  summary: string;
  videoEmbed: string;
  downloadUrl: string;
  tags: string[];
  membersOnly: boolean;
  contentType: 'video' | 'audio' | 'post' | 'download';
  previewUrl?: string; // For public teaser previews
}

export default function AdminDropsPage() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Drop>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    summary: '',
    videoEmbed: '',
    downloadUrl: '',
    tags: [],
    membersOnly: true,
    contentType: 'video',
    previewUrl: '',
  });
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDrop: Drop = {
      id: Date.now().toString(),
      title: formData.title || '',
      date: formData.date || '',
      summary: formData.summary || '',
      videoEmbed: formData.videoEmbed || '',
      downloadUrl: formData.downloadUrl || '',
      tags: formData.tags || [],
      membersOnly: formData.membersOnly ?? true,
      contentType: formData.contentType || 'video',
      previewUrl: formData.previewUrl,
    };
    setDrops([...drops, newDrop]);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      summary: '',
      videoEmbed: '',
      downloadUrl: '',
      tags: [],
      membersOnly: true,
      contentType: 'video',
      previewUrl: '',
    });
    setShowForm(false);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag),
    });
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Content Drops Manager</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Create Drop'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg))] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Summary *
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] focus:outline-none focus:border-[var(--accent)] resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Content Type *
                </label>
                <select
                  value={formData.contentType}
                  onChange={(e) => setFormData({ ...formData, contentType: e.target.value as any })}
                  required
                  className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                >
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="post">Post</option>
                  <option value="download">Download</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Video/Audio Embed Link (YouTube/Vimeo)
                </label>
                <input
                  type="url"
                  value={formData.videoEmbed}
                  onChange={(e) => setFormData({ ...formData, videoEmbed: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Public Teaser Preview URL (15-30 sec preview)
                </label>
                <input
                  type="url"
                  value={formData.previewUrl}
                  onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=... (unlisted video)"
                  className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Optional: Public preview that shows on locked vault page to entice signups
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Download Attachment URL (PDF/image pack)
                </label>
                <input
                  type="url"
                  value={formData.downloadUrl}
                  onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Add tag (tarot, rituals, etc.)"
                    className="flex-1 px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="membersOnly"
                  checked={formData.membersOnly}
                  onChange={(e) => setFormData({ ...formData, membersOnly: e.target.checked })}
                  className="w-5 h-5 rounded border-[var(--border)] bg-[var(--bg)] text-[var(--accent)]"
                />
                <label htmlFor="membersOnly" className="text-sm text-gray-300">
                  Members only (locked) - Uncheck for public teaser
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
                >
                  Create Drop
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    // In production, this would trigger the "New Drop Published" email
                    alert('Drop created! Click "Send Announcement" in Broadcast tools to notify members.');
                  }}
                  className="px-6 py-3 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg)] font-semibold rounded-lg transition-colors"
                >
                  Create & Send Announcement
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Drops List */}
        <div className="space-y-4">
          {drops.length === 0 ? (
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center text-gray-400">
              No drops yet. Create your first drop above.
            </div>
          ) : (
            drops.map((drop) => (
              <div
                key={drop.id}
                className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{drop.title}</h3>
                    <p className="text-sm text-gray-400">{drop.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      drop.membersOnly
                        ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {drop.membersOnly ? 'Members Only' : 'Public'}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{drop.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {drop.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[var(--bg)] border border-[var(--border)] rounded text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-2 py-1 bg-[var(--bg)] border border-[var(--border)] rounded text-xs text-gray-400">
                    {drop.contentType}
                  </span>
                  {drop.previewUrl && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                      Has Preview
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {drop.videoEmbed && (
                    <a
                      href={drop.videoEmbed}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--accent)] hover:text-[#d4b8ff] transition-colors"
                    >
                      View Content →
                    </a>
                  )}
                  {drop.downloadUrl && (
                    <a
                      href={drop.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--accent)] hover:text-[#d4b8ff] transition-colors"
                    >
                      Download →
                    </a>
                  )}
                </div>
                {drop.previewUrl && (
                  <div className="mt-2">
                    <a
                      href={drop.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-[var(--accent)] transition-colors"
                    >
                      Preview: {drop.previewUrl}
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
