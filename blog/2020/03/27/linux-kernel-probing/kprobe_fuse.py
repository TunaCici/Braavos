from bcc import BPF
from datetime import datetime

BPF_PROGRAM = r"""

typedef unsigned __bitwise __poll_t;

#include <linux/fs.h>
#include <linux/fuse_i.h>

struct data_t {
    u32 opcode;
    u64 nodeid;
    u64 ts;
    char process[TASK_COMM_LEN];
};
BPF_PERF_OUTPUT(events);

int kprobe__fuse_simple_request(struct pt_regs *ctx, struct fuse_conn *fc, struct fuse_args *args) {
	struct data_t data = {};

	data.opcode = args->opcode;
	data.nodeid = args->nodeid;
	data.ts = bpf_ktime_get_ns();

	bpf_get_current_comm(&data.process, sizeof(data.process));

	events.perf_submit(ctx, &data, sizeof(data));

	return 0;
}

int kprobe__fuse_mkdir(struct pt_regs *ctx, struct inode *dir, struct dentry *entry) {
  struct data_t data = {};

  data.opcode = 9; // MKDIR
  data.nodeid = dir->i_ino;
  data.ts = bpf_ktime_get_ns();

  bpf_get_current_comm(&data.process, sizeof(data.process));

  events.perf_submit(ctx, &data, sizeof(data));

  return 0;
}

"""

opCodeToText = {
  1: "LOOKUP",
  2: "FORGET",
  3: "GETATTR",
  4: "SETATTR",
  5: "READLINK",
  6: "SYMLINK",
  8: "MKNOD",
  9: "MKDIR",
  10: "UNLINK",
  11: "RMDIR",
  12: "RENAME",
  13: "LINK",
  14: "OPEN",
  15: "READ",
  16: "WRITE",
  17: "STATFS",
  18: "RELEASE",
  20: "FSYNC",
  21: "SETXATTR",
  22: "GETXATTR",
  23: "LISTXATTR",
  24: "REMOVEXATTR",
  25: "FLUSH",
  26: "INIT",
  27: "OPENDIR",
  28: "READDIR",
  29: "RELEASEDIR",
  30: "FSYNCDIR",
  31: "GETLK",
  32: "SETLK",
  33: "SETLKW",
  34: "ACCESS",
  35: "CREATE",
  36: "INTERRUPT",
  37: "BMAP",
  38: "DESTROY",
  39: "IOCTL",
  40: "POLL",
  41: "NOTIFY_REPLY",
  42: "BATCH_FORGET",
  43: "FALLOCATE",
  44: "READDIRPLUS",
  45: "RENAME2",
  46: "LSEEK",
  47: "COPY_FILE_RANGE",
  48: "SETUPMAPPING",
  49: "REMOVEMAPPING",
}

b = BPF(text=BPF_PROGRAM)

# header
print("%-18s %-16s %-6s %s" % ("TIME(s)", "PROCESS", "NODE", "OPERATION"))

# process event
start = 0
def print_event(cpu, data, size):
    global start
    event = b["events"].event(data)
    if start == 0:
            start = event.ts
    time_s = (float(event.ts - start)) / 1000000000
    print("%-18.9f %-16s %-6d %s" % (
    	time_s,
    	event.process.decode('utf8'),
      event.nodeid,
      opCodeToText[event.opcode]))

# loop with callback to print_event
b["events"].open_perf_buffer(print_event)
while 1:
    try:
        b.perf_buffer_poll()
    except KeyboardInterrupt:
        exit()
